import {Router} from 'express';
import { sendMessage, getChats, getMessages, deleteChat } from '../controllers/chat.controller.js';
import { authUser } from '../middleware/auth.middleware.js';

const chatRouter = Router();

/**
 * @route POST /api/chats/message
 * @desc Send a message in the chat
 * @access Private
 * @body {message}
 */
chatRouter.post('/message', authUser, sendMessage)

/**
 * @route GET /api/chats
 * @desc Get all chats of the user
 * @access Private
 */
chatRouter.get('/', authUser, getChats)

/**
 * @route GET /api/chats/:chatId/messages
 * @desc Get all messages of a chat
 * @access Private
 */
chatRouter.get('/:chatId/messages', authUser, getMessages)

/**
 * @route DELETE /api/chats/:chatId
 * @desc Delete a chat and its messages
 * @access Private
 */
chatRouter.delete('/:chatId', authUser, deleteChat)

export default chatRouter