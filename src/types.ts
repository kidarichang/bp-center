export interface BPCenter {
  id: number;
  name: string;
  address: string;
  phone: string;
  fax: string;
}

export interface SearchResult {
  centers: BPCenter[];
  isFallback: boolean;
  groundingUrls?: string[];
}

export interface AISearchResult {
  ids: number[];
  reason: string;
}
