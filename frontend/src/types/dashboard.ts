export type WidgetType = 'chart' | 'markdown' | 'metrics' | 'table' | 'sources';

export interface WidgetData {
  id: string;
  type: WidgetType;
  title: string;
  data: any;
  width: 'full' | 'half';
}

export interface OmniResponse {
  summary: string;
  widgets: WidgetData[];
  sources: {
    title: string;
    url: string;
    relevance: string;
  }[];
}
