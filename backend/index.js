import { answerQuestion } from './src/agents.js';

async function main() {
  const question = '¿Cuál es el estado actual del microservicio?';
  const response = await answerQuestion(question);
  console.log('Respuesta GPT:', response);
}

main().catch(console.error);
