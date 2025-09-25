import { Router } from 'express';
import { getClients, getClientById, createClient, updateClient, deleteClient } from '../controllers/clientController';

const router = Router();

router.get('/', getClients);
router.post('/', createClient);
router.get('/:id', getClientById);
router.put('/:id', updateClient);
router.delete('/:id', deleteClient);

export default router;
