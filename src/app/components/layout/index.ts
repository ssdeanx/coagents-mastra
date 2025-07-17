/**
 * Layout Components Export Index
 * 
 * Centralized exports for all layout components used throughout the application.
 * Includes navigation, page layouts, and theme components.
 */

// Navigation Components
export { TopNavbar } from "./top-navbar";
export { Sidebar } from "./sidebar";
export { Footer } from "./footer";

// Theme Components  
export { ThemeProvider } from "./theme-provider";
export { ThemeSwitch } from "./theme-switch";

// Page Layout Components
export { 
  PageLayout,
  DashboardPageLayout,
  ResearchPageLayout, 
  WorkflowPageLayout,
  AnalyticsPageLayout
} from "./page-layout";

// Types
export type { 
  PageLayoutProps,
  MastraAgent 
} from "./page-layout";
