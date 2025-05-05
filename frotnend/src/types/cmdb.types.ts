export interface CMDB {
  id?: string;
  addressIP: string;
  addressType: string;
  organization: string;
  country: string;
  countryCode: string;
  continentCode: string;
  usageType: string;
  threatLevel: string;
  threatDetails: string[] | string;
  firstSeen: string;
  lastSeen: string;
}

export interface QueryParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  addressIP?: string;
  addressType?: string;
  organization?: string;
  country?: string;
  countryCode?: string;
  continentCode?: string;
  usageType?: string;
  threatLevel?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ColumnConfig {
  key: keyof CMDB;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  render?: (value: unknown, record: CMDB) => React.ReactNode;
}
