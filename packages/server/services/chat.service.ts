import fs from 'fs';
import path from 'path';
import OpenAI from 'openai';
import { conversationRepository } from '../repository/conversation.repository';
import template from '../prompts/ChatBot.txt';

// Implementation Detail
const client = new OpenAI({
   apiKey: process.env.OPENAI_API_KEY,
});

const parkInfo = fs.readFileSync(
   path.join(__dirname, '..', 'prompts', 'WonderWorld.md'),
   'utf-8'
);
const instructions = template.replace('{{parkInfo}}', parkInfo);

type chatResponse = {
   id: string;
   message: string;
};

export const chatService = {
   async sendMessage(
      prompt: string,
      conversationId: string
   ): Promise<chatResponse> {
      const response = await client.responses.create({
         model: 'gpt-4o-mini',
         instructions,
         input: prompt,
         temperature: 0.2,
         max_output_tokens: 500,
         previous_response_id:
            conversationRepository.getLastResponseId(conversationId),
      });

      conversationRepository.setLastResponseId(conversationId, response.id);
      return { id: response.id, message: response.output_text };
   },
};
