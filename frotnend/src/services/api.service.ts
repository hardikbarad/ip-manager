import axios from "axios";
import { CMDB, PaginatedResponse, QueryParams } from "../types/cmdb.types";

// Create axios instance with base URL
const API = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json"
  }
});

export const CMDBService = {
  /**
   * Get all CMDB entries with pagination, sorting, and filtering
   */
  getAllEntries: async (
    queryParams: QueryParams
  ): Promise<PaginatedResponse<CMDB>> => {
    // Convert queryParams to URL query string
    const queryString = Object.entries(queryParams)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([_, value]) => value !== undefined && value !== "")
      .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
      .join("&");

    const response = await API.get<PaginatedResponse<CMDB>>(
      `/cmdb?${queryString}`
    );
    return response.data;
  },

  /**
   * Get a single CMDB entry by ID
   */
  getEntryById: async (id: string): Promise<CMDB> => {
    const response = await API.get<CMDB>(`/cmdb/id/${id}`);
    return response.data;
  },

  /**
   * Get a single CMDB entry by IP address
   */
  getEntryByIP: async (ip: string): Promise<CMDB> => {
    const response = await API.get<CMDB>(`/cmdb/ip/${ip}`);
    return response.data;
  },

  /**
   * Create a new CMDB entry
   */
  createEntry: async (entry: CMDB): Promise<CMDB> => {
    const response = await API.post<CMDB>("/cmdb", entry);
    return response.data;
  },

  /**
   * Update an existing CMDB entry
   */
  updateEntry: async (id: string, entry: Partial<CMDB>): Promise<CMDB> => {
    const response = await API.put<CMDB>(`/cmdb/${id}`, entry);
    return response.data;
  },

  /**
   * Delete a CMDB entry
   */
  deleteEntry: async (id: string): Promise<void> => {
    await API.delete(`/cmdb/${id}`);
  }
};
