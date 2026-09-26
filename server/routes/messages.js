import express from 'express';
import { createMessage, deleteMessage, getMessage, getMessages, updateMessage } from '../controllers/MessageController.js';

const router = express.Router();

router.get('/', getMessages);

router.get('/:id', getMessage);

router.post('/', createMessage);

router.delete('/:id', deleteMessage);

router.patch('/:id', updateMessage);

export default router