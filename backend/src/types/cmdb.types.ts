export interface ICMDB {
  id?: string;
  addressIP: string;
  addressType: "private" | "public" | string;
  organization: string;
  country: string;
  countryCode: string;
  continentCode: string;
  usageType: string;
  threatLevel: string;
  threatDetails: string[] | string; // Array of threats
  firstSeen?: string | Date;
  lastSeen?: string | Date;
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
