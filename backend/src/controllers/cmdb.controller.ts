import { Request, Response } from 'express';
import cmdbService from '../services/cmdb.service';
import { QueryParams } from '../types/cmdb.types';

export class CMDBController {
  /**
   * Get all CMDB entries with pagination, filtering, and sorting
   */
  async getAllEntries(req: Request, res: Response): Promise<void> {
    try {
      const queryParams: QueryParams = {
        page: req.query.page ? parseInt(req.query.page as string, 10) : undefined,
        limit: req.query.limit ? parseInt(req.query.limit as string, 10) : undefined,
        sortBy: req.query.sortBy as string,
        sortOrder: req.query.sortOrder as 'asc' | 'desc',
        addressIP: req.query.addressIP as string,
        addressType: req.query.addressType as string,
        organization: req.query.organization as string,
        country: req.query.country as string,
        countryCode: req.query.countryCode as string,
        continentCode: req.query.continentCode as string,
        usageType: req.query.usageType as string,
        threatLevel: req.query.threatLevel as string,
      };

      const result = await cmdbService.getAllEntries(queryParams);
      res.status(200).json(result);
    } catch (error) {
      console.error('Error fetching entries:', error);
      res.status(500).json({ 
        message: 'Error fetching entries', 
        error: (error as Error).message 
      });
    }
  }

  /**
   * Get a single CMDB entry by ID
   */
  async getEntryById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const entry = await cmdbService.getEntryById(id);

      if (!entry) {
        res.status(404).json({ message: 'Entry not found' });
        return;
      }

      res.status(200).json(entry);
    } catch (error) {
      console.error('Error fetching entry:', error);
      res.status(500).json({ 
        message: 'Error fetching entry', 
        error: (error as Error).message 
      });
    }
  }

  /**
   * Get a single CMDB entry by IP address
   */
  async getEntryByIP(req: Request, res: Response): Promise<void> {
    try {
      const { ip } = req.params;
      const entry = await cmdbService.getEntryByIP(ip);

      if (!entry) {
        res.status(404).json({ message: 'Entry not found' });
        return;
      }

      res.status(200).json(entry);
    } catch (error) {
      console.error('Error fetching entry by IP:', error);
      res.status(500).json({ 
        message: 'Error fetching entry by IP', 
        error: (error as Error).message 
      });
    }
  }

  /**
   * Create a new CMDB entry
   */
  async createEntry(req: Request, res: Response): Promise<void> {
    try {
      const entry = await cmdbService.createEntry(req.body);
      res.status(201).json(entry);
    } catch (error) {
      console.error('Error creating entry:', error);
      res.status(500).json({ 
        message: 'Error creating entry', 
        error: (error as Error).message 
      });
    }
  }

  /**
   * Update an existing CMDB entry
   */
  async updateEntry(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updatedEntry = await cmdbService.updateEntry(id, req.body);

      if (!updatedEntry) {
        res.status(404).json({ message: 'Entry not found' });
        return;
      }

      res.status(200).json(updatedEntry);
    } catch (error) {
      console.error('Error updating entry:', error);
      res.status(500).json({ 
        message: 'Error updating entry', 
        error: (error as Error).message 
      });
    }
  }

  /**
   * Delete a CMDB entry
   */
  async deleteEntry(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deletedEntry = await cmdbService.deleteEntry(id);

      if (!deletedEntry) {
        res.status(404).json({ message: 'Entry not found' });
        return;
      }

      res.status(200).json({ message: 'Entry deleted successfully' });
    } catch (error) {
      console.error('Error deleting entry:', error);
      res.status(500).json({ 
        message: 'Error deleting entry', 
        error: (error as Error).message 
      });
    }
  }
}

export default new CMDBController();