export interface RevenuePoint {
  label: string;
  revenue: number;
}

export interface AnalyticsData {
  revenue: number;
  orders: number;
  customers: number;
  conversionRate: number;
  salesOverview: number[];
  revenueSummary: RevenuePoint[];
  salesByCategory: Array<{ category: string; value: number }>;
  salesByProduct: Array<{ product: string; value: number }>;
  customerGrowth: Array<{ month: string; customers: number }>;
}

export interface AiInsightData {
  revenueTrends: Array<{ label: string; value: number }>;
  productRecommendations: Array<{ name: string; reason: string }>;
  lowStockWarnings: Array<{ product: string; stock: number }>;
  salesPredictions: Array<{ period: string; forecast: string }>;
  bestSellingCategories: Array<{ category: string; revenue: string }>;
  peakShoppingHours: Array<{ hour: string; orders: number }>;
}
