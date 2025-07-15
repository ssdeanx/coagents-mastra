/**
 * PerformanceDataService - Service class for agent performance metrics collection and management
 * Requirements: 1.1, 2.1, 3.1, 5.1
 */

import {
  AgentMetrics,
  ToolUsageMetric,
  PerformanceAlert,
  InteractionLog,
  TimeRange,
  HistoricalMetrics,
  HistoricalDataPoint,
  AlertConfiguration,
  NotificationChannel
} from './dashboard-types';

/**
 * Service class for managing agent performance data, metrics collection,
 * real-time updates, and alert management
 */
export class PerformanceDataService {
  private static instance: PerformanceDataService;
  private metricsCache: Map<string, AgentMetrics> = new Map();
  private interactionLogsCache: Map<string, InteractionLog[]> = new Map();
  private alertsCache: PerformanceAlert[] = [];
  private alertConfigurations: Map<string, AlertConfiguration> = new Map();
  private subscribers: Set<(metrics: AgentMetrics[]) => void> = new Set();
  private websocket: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;

  private constructor() {
    this.initializeWebSocket();
    this.loadCachedData();
  }

  /**
   * Get singleton instance of PerformanceDataService
   */
  public static getInstance(): PerformanceDataService {
    if (!PerformanceDataService.instance) {
      PerformanceDataService.instance = new PerformanceDataService();
    }
    return PerformanceDataService.instance;
  }

  /**
   * Get real-time metrics for all agents
   * Requirements: 1.1 - Real-time performance metrics display
   */
  public async getAgentMetrics(): Promise<AgentMetrics[]> {
    try {
      // First try to get fresh data from Mastra telemetry
      const response = await fetch('/api/mastra/metrics');
      if (response.ok) {
        const metrics: AgentMetrics[] = await response.json();
        
        // Update cache
        metrics.forEach(metric => {
          this.metricsCache.set(metric.agentId, metric);
        });
        
        // Store in IndexedDB for offline access
        await this.cacheMetricsData(metrics);
        
        return metrics;
      }
    } catch (error) {
      console.warn('Failed to fetch real-time metrics, using cached data:', error);
    }

    // Fallback to cached data
    return Array.from(this.metricsCache.values());
  }

  /**
   * Get metrics for a specific agent
   * Requirements: 1.1 - Individual agent monitoring
   */
  public async getAgentById(agentId: string): Promise<AgentMetrics | null> {
    try {
      const response = await fetch(`/api/mastra/metrics/${agentId}`);
      if (response.ok) {
        const metric: AgentMetrics = await response.json();
        this.metricsCache.set(agentId, metric);
        return metric;
      }
    } catch (error) {
      console.warn(`Failed to fetch metrics for agent ${agentId}:`, error);
    }

    // Fallback to cached data
    return this.metricsCache.get(agentId) || null;
  }

  /**
   * Get historical performance data for specified time range
   * Requirements: 2.1 - Historical data analysis
   */
  public async getHistoricalData(timeRange: TimeRange): Promise<HistoricalMetrics> {
    try {
      const response = await fetch('/api/mastra/metrics/historical', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(timeRange),
      });

      if (response.ok) {
        const historicalData: HistoricalMetrics = await response.json();
        
        // Cache historical data
        await this.cacheHistoricalData(timeRange, historicalData);
        
        return historicalData;
      }
    } catch (error) {
      console.warn('Failed to fetch historical data:', error);
    }

    // Fallback to cached historical data
    return await this.getCachedHistoricalData(timeRange);
  }

  /**
   * Get interaction logs for a specific agent
   * Requirements: 3.1 - Individual interaction monitoring
   */
  public async getInteractionLogs(agentId: string, limit: number = 100): Promise<InteractionLog[]> {
    try {
      const response = await fetch(`/api/mastra/interactions/${agentId}?limit=${limit}`);
      if (response.ok) {
        const logs: InteractionLog[] = await response.json();
        
        // Update cache
        this.interactionLogsCache.set(agentId, logs);
        
        // Store in IndexedDB
        await this.cacheInteractionLogs(agentId, logs);
        
        return logs;
      }
    } catch (error) {
      console.warn(`Failed to fetch interaction logs for agent ${agentId}:`, error);
    }

    // Fallback to cached data
    return this.interactionLogsCache.get(agentId) || [];
  }

  /**
   * Get active performance alerts
   * Requirements: 5.1 - Alert management
   */
  public async getActiveAlerts(): Promise<PerformanceAlert[]> {
    try {
      const response = await fetch('/api/mastra/alerts');
      if (response.ok) {
        const alerts: PerformanceAlert[] = await response.json();
        this.alertsCache = alerts;
        return alerts.filter(alert => !alert.resolved);
      }
    } catch (error) {
      console.warn('Failed to fetch active alerts:', error);
    }

    // Fallback to cached alerts
    return this.alertsCache.filter(alert => !alert.resolved);
  }

  /**
   * Get all alerts (active and resolved)
   * Requirements: 5.1 - Alert history
   */
  public async getAllAlerts(): Promise<PerformanceAlert[]> {
    try {
      const response = await fetch('/api/mastra/alerts/all');
      if (response.ok) {
        const alerts: PerformanceAlert[] = await response.json();
        this.alertsCache = alerts;
        return alerts;
      }
    } catch (error) {
      console.warn('Failed to fetch all alerts:', error);
    }

    return this.alertsCache;
  }

  /**
   * Configure a new performance alert
   * Requirements: 5.1 - Alert configuration
   */
  public async configureAlert(config: AlertConfiguration): Promise<void> {
    try {
      const response = await fetch('/api/mastra/alerts/configure', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(config),
      });

      if (response.ok) {
        this.alertConfigurations.set(config.id, config);
        await this.cacheAlertConfiguration(config);
      } else {
        throw new Error(`Failed to configure alert: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error configuring alert:', error);
      throw error;
    }
  }

  /**
   * Update an existing alert configuration
   * Requirements: 5.1 - Alert management
   */
  public async updateAlertConfiguration(config: AlertConfiguration): Promise<void> {
    try {
      const response = await fetch(`/api/mastra/alerts/configure/${config.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(config),
      });

      if (response.ok) {
        this.alertConfigurations.set(config.id, config);
        await this.cacheAlertConfiguration(config);
      } else {
        throw new Error(`Failed to update alert configuration: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error updating alert configuration:', error);
      throw error;
    }
  }

  /**
   * Delete an alert configuration
   * Requirements: 5.1 - Alert management
   */
  public async deleteAlertConfiguration(alertId: string): Promise<void> {
    try {
      const response = await fetch(`/api/mastra/alerts/configure/${alertId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        this.alertConfigurations.delete(alertId);
        await this.removeCachedAlertConfiguration(alertId);
      } else {
        throw new Error(`Failed to delete alert configuration: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error deleting alert configuration:', error);
      throw error;
    }
  }

  /**
   * Get all alert configurations
   * Requirements: 5.1 - Alert configuration management
   */
  public async getAlertConfigurations(): Promise<AlertConfiguration[]> {
    try {
      const response = await fetch('/api/mastra/alerts/configurations');
      if (response.ok) {
        const configs: AlertConfiguration[] = await response.json();
        configs.forEach(config => {
          this.alertConfigurations.set(config.id, config);
        });
        return configs;
      }
    } catch (error) {
      console.warn('Failed to fetch alert configurations:', error);
    }

    return Array.from(this.alertConfigurations.values());
  }

  /**
   * Subscribe to real-time metrics updates
   * Requirements: 1.1 - Real-time updates
   */
  public subscribeToMetrics(callback: (metrics: AgentMetrics[]) => void): () => void {
    this.subscribers.add(callback);
    
    // Return unsubscribe function
    return () => {
      this.subscribers.delete(callback);
    };
  }

  /**
   * Initialize WebSocket connection for real-time updates
   * Requirements: 1.1 - Real-time monitoring
   */
  private initializeWebSocket(): void {
    try {
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${protocol}//${window.location.host}/api/mastra/ws`;
      
      this.websocket = new WebSocket(wsUrl);
      
      this.websocket.onopen = () => {
        console.log('WebSocket connected for real-time metrics');
        this.reconnectAttempts = 0;
      };
      
      this.websocket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          this.handleWebSocketMessage(data);
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };
      
      this.websocket.onclose = () => {
        console.log('WebSocket connection closed');
        this.attemptReconnect();
      };
      
      this.websocket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    } catch (error) {
      console.error('Failed to initialize WebSocket:', error);
    }
  }

  /**
   * Handle incoming WebSocket messages
   */
  private handleWebSocketMessage(data: any): void {
    if (data.type === 'metrics_update') {
      const metrics: AgentMetrics[] = data.payload;
      
      // Update cache
      metrics.forEach(metric => {
        this.metricsCache.set(metric.agentId, metric);
      });
      
      // Notify subscribers
      this.subscribers.forEach(callback => {
        try {
          callback(metrics);
        } catch (error) {
          console.error('Error in metrics subscriber callback:', error);
        }
      });
    } else if (data.type === 'alert') {
      const alert: PerformanceAlert = data.payload;
      this.alertsCache.push(alert);
    }
  }

  /**
   * Attempt to reconnect WebSocket
   */
  private attemptReconnect(): void {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);
      
      setTimeout(() => {
        console.log(`Attempting WebSocket reconnection (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
        this.initializeWebSocket();
      }, delay);
    } else {
      console.error('Max WebSocket reconnection attempts reached');
    }
  }

  /**
   * Load cached data from IndexedDB on initialization
   */
  private async loadCachedData(): Promise<void> {
    try {
      // Load cached metrics
      const cachedMetrics = await this.getCachedMetrics();
      cachedMetrics.forEach(metric => {
        this.metricsCache.set(metric.agentId, metric);
      });

      // Load cached alert configurations
      const cachedConfigs = await this.getCachedAlertConfigurations();
      cachedConfigs.forEach(config => {
        this.alertConfigurations.set(config.id, config);
      });
    } catch (error) {
      console.warn('Failed to load cached data:', error);
    }
  }

  // IndexedDB caching methods
  private async cacheMetricsData(metrics: AgentMetrics[]): Promise<void> {
    // Implementation would use IndexedDB to store metrics data
    // For now, using localStorage as a simple fallback
    try {
      localStorage.setItem('agent_metrics_cache', JSON.stringify({
        timestamp: Date.now(),
        data: metrics
      }));
    } catch (error) {
      console.warn('Failed to cache metrics data:', error);
    }
  }

  private async getCachedMetrics(): Promise<AgentMetrics[]> {
    try {
      const cached = localStorage.getItem('agent_metrics_cache');
      if (cached) {
        const { timestamp, data } = JSON.parse(cached);
        // Return cached data if it's less than 5 minutes old
        if (Date.now() - timestamp < 5 * 60 * 1000) {
          return data;
        }
      }
    } catch (error) {
      console.warn('Failed to get cached metrics:', error);
    }
    return [];
  }

  private async cacheHistoricalData(timeRange: TimeRange, data: HistoricalMetrics): Promise<void> {
    try {
      const key = `historical_${timeRange.startDate.getTime()}_${timeRange.endDate.getTime()}`;
      localStorage.setItem(key, JSON.stringify({
        timestamp: Date.now(),
        data
      }));
    } catch (error) {
      console.warn('Failed to cache historical data:', error);
    }
  }

  private async getCachedHistoricalData(timeRange: TimeRange): Promise<HistoricalMetrics> {
    try {
      const key = `historical_${timeRange.startDate.getTime()}_${timeRange.endDate.getTime()}`;
      const cached = localStorage.getItem(key);
      if (cached) {
        const { data } = JSON.parse(cached);
        return data;
      }
    } catch (error) {
      console.warn('Failed to get cached historical data:', error);
    }

    // Return empty historical data as fallback
    return {
      timeRange,
      agentMetrics: [],
      aggregatedData: {
        totalRequests: 0,
        averageSuccessRate: 0,
        averageResponseTime: 0,
        totalErrors: 0
      },
      dataPoints: []
    };
  }

  private async cacheInteractionLogs(agentId: string, logs: InteractionLog[]): Promise<void> {
    try {
      localStorage.setItem(`interaction_logs_${agentId}`, JSON.stringify({
        timestamp: Date.now(),
        data: logs
      }));
    } catch (error) {
      console.warn('Failed to cache interaction logs:', error);
    }
  }

  private async cacheAlertConfiguration(config: AlertConfiguration): Promise<void> {
    try {
      const configs = await this.getCachedAlertConfigurations();
      const updatedConfigs = configs.filter(c => c.id !== config.id);
      updatedConfigs.push(config);
      
      localStorage.setItem('alert_configurations', JSON.stringify(updatedConfigs));
    } catch (error) {
      console.warn('Failed to cache alert configuration:', error);
    }
  }

  private async getCachedAlertConfigurations(): Promise<AlertConfiguration[]> {
    try {
      const cached = localStorage.getItem('alert_configurations');
      if (cached) {
        return JSON.parse(cached);
      }
    } catch (error) {
      console.warn('Failed to get cached alert configurations:', error);
    }
    return [];
  }

  private async removeCachedAlertConfiguration(alertId: string): Promise<void> {
    try {
      const configs = await this.getCachedAlertConfigurations();
      const updatedConfigs = configs.filter(c => c.id !== alertId);
      localStorage.setItem('alert_configurations', JSON.stringify(updatedConfigs));
    } catch (error) {
      console.warn('Failed to remove cached alert configuration:', error);
    }
  }

  /**
   * Cleanup resources when service is destroyed
   */
  public destroy(): void {
    if (this.websocket) {
      this.websocket.close();
      this.websocket = null;
    }
    this.subscribers.clear();
    this.metricsCache.clear();
    this.interactionLogsCache.clear();
    this.alertConfigurations.clear();
  }
}

// Export singleton instance
export const performanceDataService = PerformanceDataService.getInstance();