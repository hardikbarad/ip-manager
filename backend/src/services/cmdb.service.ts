import CMDB from "../models/cmdb.model";
import { ICMDB, PaginatedResponse, QueryParams } from "../types/cmdb.types";

export class CMDBService {
  /**
   * Get all CMDB entries with pagination, sorting, and filtering
   */
  async getAllEntries(
    queryParams: QueryParams
  ): Promise<PaginatedResponse<ICMDB>> {
    const {
      page = 1,
      limit = 10,
      sortBy = "lastSeen",
      sortOrder = "desc",
      ...filters
    } = queryParams;

    // Build filter conditions
    const filterConditions: Record<string, any> = {};

    // Add each filter if it exists
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        if (key === "addressIP") {
          // For IP address, use regex for partial match
          filterConditions[key] = { $regex: value, $options: "i" };
        } else {
          filterConditions[key] = { $regex: value, $options: "i" };
        }
      }
    });

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Build sort object
    const sort: Record<string, 1 | -1> = {};
    sort[sortBy] = sortOrder === "asc" ? 1 : -1;

    // Execute query with filters, pagination, and sorting
    const data = await CMDB.find(filterConditions)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean();

    // Get total count for pagination info
    const total = await CMDB.countDocuments(filterConditions);
    const totalPages = Math.ceil(total / limit);

    return {
      data,
      total,
      page,
      limit,
      totalPages
    };
  }

  /**
   * Get a single CMDB entry by ID
   */
  async getEntryById(id: string): Promise<ICMDB | null> {
    return CMDB.findById(id).lean();
  }

  /**
   * Get a single CMDB entry by IP address
   */
  async getEntryByIP(addressIP: string): Promise<ICMDB | null> {
    return CMDB.findOne({ addressIP }).lean();
  }

  /**
   * Create a new CMDB entry
   */
  async createEntry(entry: ICMDB): Promise<ICMDB> {
    const newEntry = new CMDB(entry);
    return newEntry.save();
  }

  /**
   * Update an existing CMDB entry
   */
  async updateEntry(id: string, entry: Partial<ICMDB>): Promise<ICMDB | null> {
    return CMDB.findByIdAndUpdate(id, entry, { new: true }).lean();
  }

  /**
   * Delete a CMDB entry
   */
  async deleteEntry(id: string): Promise<ICMDB | null> {
    return CMDB.findByIdAndDelete(id).lean();
  }

  /**
   * Create multiple entries at once (for importing)
   */
  async createManyEntries(entries: ICMDB[]): Promise<number> {
    const result = await CMDB.insertMany(entries, { ordered: false });
    return result.length;
  }
}

export default new CMDBService();
