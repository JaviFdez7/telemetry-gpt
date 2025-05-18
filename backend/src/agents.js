import { tracesMock, logsMock, metricsMock } from './mockData.js';
import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // put your API key here or in environment variables
});

// Agent 1: mocks the request to endpoints and filters relevant info
export async function agent1(question) {
  // Simulate query delay with Promise
  await new Promise(resolve => setTimeout(resolve, 300));

  // Simple filtering to show example
  const relevantData = {
    traces: tracesMock,
    logs: logsMock,
    metrics: metricsMock
  };

  return relevantData;
}

// Agent 2: generates answer using GPT with info from agent 1
export async function agent2(question, data) {
  const prompt = `
    You are a telemetry expert assistant that answers questions about a microservice.

    Question: ${question}

    These are the relevant data from the microservice:
    ${JSON.stringify(data, null, 2)}

    Respond clearly and in natural language.
    `;
    
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    store: true,
    messages: [{ role: 'user', content: prompt }],
  });

  return response.choices[0].message.content;
}

// Orchestrator: runs both agents
export async function answerQuestion(question) {
  const data = await agent1(question);
  const answer = await agent2(question, data);
  return answer;
}