export type WidgetType = 'chart' | 'markdown' | 'metrics' | 'table' | 'sources';

export interface ChartData {
  labels: string[];
  datasets: { label: string; data: number[] }[];
}

export interface Metric {
  label: string;
  value: string;
  trend: 'up' | 'down' | 'neutral';
}

interface WidgetBase {
  id: string;
  title: string;
  width: 'full' | 'half';
}

// Discriminated on `type` so renderWidget narrows `data` per case.
export type WidgetData =
  | (WidgetBase & { type: 'chart'; data: ChartData })
  | (WidgetBase & { type: 'markdown'; data: string | { content?: string } })
  | (WidgetBase & { type: 'metrics'; data: Metric[] })
  | (WidgetBase & { type: 'table'; data: unknown })
  | (WidgetBase & { type: 'sources'; data: unknown });

export interface OmniResponse {
  summary: string;
  widgets: WidgetData[];
  sources: {
    title: string;
    url: string;
    relevance: string;
  }[];
}
