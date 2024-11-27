import express, { Request, Response } from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all routes
app.use(cors({
  origin: 'http://localhost:3000', // Allow your React app's origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow these HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
}));

app.use(express.json());

const WEBTAB_BASE_API_URL = 'https://webtab-task.a-goodarzi.ir/demo/v1';

interface FetchDataRequest {
  token: string;
  fileId: number;
  language: string;
  fileType: string;
}

app.post('/fetch-data', async (req: Request<{}, {}, FetchDataRequest>, res: Response): Promise<void> => {
  const { token, fileId, language, fileType } = req.body;

  if (!token || !fileId || !language || !fileType) {
    res.status(400).json({ message: 'Missing required fields' });
    return;
  }

  let url: string;

  if (fileType === 'bpmn-file') {
    url = `${WEBTAB_BASE_API_URL}/bpmn-file?fileId=${fileId}`;
  } else if (fileType === 'formio-file') {
    url = `${WEBTAB_BASE_API_URL}/formio-file?fileId=${fileId}`;
  } else {
    res.status(400).json({ message: 'Invalid fileType' });
    return;
  }

  try {
    const response = await axios.get(url, {
      headers: { language, token },
    });

    console.log('Fetched data:', response.data);
    
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Error fetching data from external API', error });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

