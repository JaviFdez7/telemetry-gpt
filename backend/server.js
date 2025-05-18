import express from 'express';
import cors from 'cors';
import { answerQuestion } from './src/agents.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  console.log('Server root URL accessed');
});

app.post('/chat', async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) return res.status(400).json({ error: 'Missing question' });

    const answer = await answerQuestion(question);
    res.json({ answer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal error' });
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
