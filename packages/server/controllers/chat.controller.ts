import type { Request, Response } from 'express';
import z from 'zod';
import { chatService } from '../services/chat.service';

// Implementation Detail
const chatRequestSchema = z.object({
   prompt: z
      .string()
      .trim()
      .min(1, 'Prompt is required')
      .max(1000, 'Prompt must be at most 1000 characters long'),
   conversationId: z.string().uuid(),
});

// Public Interface
export const chatController = {
   async sendMessage(req: Request, res: Response) {
      const parseResult = chatRequestSchema.safeParse(req.body);
      if (!parseResult.success) {
         res.status(400).json(parseResult.error.format());
         return;
      }

      try {
         const { prompt, conversationId } = req.body;
         const response = await chatService.sendMessage(prompt, conversationId);
         res.json({ message: response.message });
      } catch (error) {
         console.error('Error communicating with OpenAI:', error);
         res.status(500).json({ error: 'Failed to get response from AI' });
      }
   },
};
