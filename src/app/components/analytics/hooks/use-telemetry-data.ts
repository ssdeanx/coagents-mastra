/**
 * @namespace AnalyticsHooks
 * @module src/app/components/analytics/hooks/use-telemetry-data.ts
 * @author ssdeanx
 * @version 1.0.0
 * @license MIT
 * @see {@link https://docs.mastra.ai/|Mastra Documentation}
 * @file React hook for fetching and managing telemetry data
 *
 * @implements Real telemetry data fetching from Mastra backend
 * @implements Real-time data updates with polling
 * @since 2025-07-20
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import '@/app/globals.css';
import {
  TelemetryResponse,
  AnalyticsData,
  ErrorState,
  LoadingState,
  DataProcessingOptions
} from '../types';
import { processAnalyticsData } from '../utils/data-processing';

/**
 * Hook configuration options
 */
interface UseTelemetryDataOptions {
  refreshInterval?: number;
  autoRefresh?: boolean;
  onError?: (error: Error) => void;
  onDataUpdate?: (data: AnalyticsData) => void;
  processingOptions?: DataProcessingOptions;
}

/**
 * Hook return type
 */
interface UseTelemetryDataReturn {
  data: AnalyticsData | null;
  rawData: TelemetryResponse | null;
  loading: LoadingState;
  error: ErrorState;
  refresh: () => Promise<void>;
  startPolling: () => void;
  stopPolling: () => void;
  isPolling: boolean;
}

/**
 * Custom hook for fetching and managing telemetry data from Mastra backend
 *
 * @param options - Configuration options for the hook
 * @returns Object containing data, loading state, error state, and control functions
 */
export function useTelemetryData(
  options: UseTelemetryDataOptions = {}
): UseTelemetryDataReturn {
  const {
    refreshInterval = 5000,
    autoRefresh = true,
    onError,
    onDataUpdate,
    processingOptions = {}
  } = options;

  // State management
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [rawData, setRawData] = useState<TelemetryResponse | null>(null);
  const [loading, setLoading] = useState<LoadingState>({
    isLoading: false,
    message: 'Initializing...'
  });
  const [error, setError] = useState<ErrorState>({
    hasError: false,
    message: '',
    timestamp: new Date()
  });

  // Refs for polling control
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isPollingRef = useRef<boolean>(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  /**
   * Clear any existing error state
   */
  const clearError = useCallback(() => {
    setError({
      hasError: false,
      message: '',
      timestamp: new Date()
    });
  }, []);

  /**
   * Set error state with proper error handling
   */
  const setErrorState = useCallback((err: Error | string, details?: string) => {
    const errorMessage = err instanceof Error ? err.message : err;
    const errorState: ErrorState = {
      hasError: true,
      message: errorMessage,
      details,
      timestamp: new Date()
    };

    setError(errorState);

    if (onError && err instanceof Error) {
      onError(err);
    }
  }, [onError]);

  /**
   * Fetch telemetry data from the Mastra backend
   */
  const fetchTelemetryData = useCallback(async (): Promise<TelemetryResponse> => {
    // Cancel any existing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller for this request
    abortControllerRef.current = new AbortController();

    try {
      const response = await fetch('/api/copilotkit?telemetry=true', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: abortControllerRef.current.signal
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const telemetryData: TelemetryResponse = await response.json();

      if (!telemetryData.success) {
        throw new Error(telemetryData.error || 'Failed to fetch telemetry data');
      }

      return telemetryData;
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        // Request was aborted, don't treat as error
        throw err;
      }

      throw new Error(
        err instanceof Error
          ? `Failed to fetch telemetry data: ${err.message}`
          : 'Unknown error occurred while fetching telemetry data'
      );
    }
  }, []);

  /**
   * Process and update data
   */
  const processAndUpdateData = useCallback((telemetryResponse: TelemetryResponse) => {
    try {
      const processedData = processAnalyticsData(telemetryResponse, processingOptions);

      setRawData(telemetryResponse);
      setData(processedData);

      if (onDataUpdate) {
        onDataUpdate(processedData);
      }
    } catch (err) {
      throw new Error(
        `Failed to process telemetry data: ${err instanceof Error ? err.message : 'Unknown error'}`
      );
    }
  }, [processingOptions, onDataUpdate]);

  /**
   * Refresh data manually
   */
  const refresh = useCallback(async (): Promise<void> => {
    setLoading({
      isLoading: true,
      message: 'Fetching telemetry data...'
    });

    clearError();

    try {
      const telemetryResponse = await fetchTelemetryData();
      processAndUpdateData(telemetryResponse);
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        return; // Don't update state for aborted requests
      }

      setErrorState(
        err instanceof Error ? err : new Error('Unknown error'),
        'Error occurred during data refresh'
      );
    } finally {
      setLoading({
        isLoading: false
      });
    }
  }, [fetchTelemetryData, processAndUpdateData, clearError, setErrorState]);

  /**
   * Start polling for data updates
   */
  const startPolling = useCallback(() => {
    if (isPollingRef.current) {
      return;
    }

    isPollingRef.current = true;

    intervalRef.current = setInterval(() => {
      if (isPollingRef.current) {
        refresh().catch(() => {
          // Error handling is done in refresh function
        });
      }
    }, refreshInterval);
  }, [refresh, refreshInterval]);

  /**
   * Stop polling for data updates
   */
  const stopPolling = useCallback(() => {
    isPollingRef.current = false;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Cancel any pending request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  }, []);

  /**
   * Initial data fetch and polling setup
   */
  useEffect(() => {
    // Initial data fetch
    refresh();

    // Start auto-refresh if enabled
    if (autoRefresh) {
      startPolling();
    }

    // Cleanup on unmount
    return () => {
      stopPolling();
    };
  }, [refresh, autoRefresh, startPolling, stopPolling]);

  /**
   * Cleanup on unmount
   */
  useEffect(() => {
    return () => {
      stopPolling();
    };
  }, [stopPolling]);

  return {
    data,
    rawData,
    loading,
    error,
    refresh,
    startPolling,
    stopPolling,
    isPolling: isPollingRef.current
  };
}
