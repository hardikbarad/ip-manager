import { Router } from 'express';
import cmdbController from '../controllers/cmdb.controller';

const router = Router();

// Get all entries with pagination, filtering, and sorting
router.get('/', cmdbController.getAllEntries);

// Get entry by ID
router.get('/id/:id', cmdbController.getEntryById);

// Get entry by IP address
router.get('/ip/:ip', cmdbController.getEntryByIP);

// Create a new entry
router.post('/', cmdbController.createEntry);

// Update an existing entry
router.put('/:id', cmdbController.updateEntry);

// Delete an entry
router.delete('/:id', cmdbController.deleteEntry);

export default router;