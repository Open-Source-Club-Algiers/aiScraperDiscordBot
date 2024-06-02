import { Message } from 'discord.js';
import {client,genAI}from'../config'
import { ChatCompletion } from 'openai/resources';

import { channel } from "diagnostics_channel";
const messageCreate = async (message:Message<boolean>) => {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest"});

    const prompt = message.content

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response
};




export   {
    messageCreate,
    
};
