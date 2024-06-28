import express from 'express';
import envConfig from './config/envConfig';
import connectDB from './db/connection';
import userRoutes from './features/user/routes';
import bookRoutes from './features/book/routes';
import cors from "cors";
import reviewRoutes from './features/review/routes';

const app = express();
const env = envConfig();
const port = env.port;

app.use(cors());
app.use(express.json({ limit: '15mb' }));

app.use('/', userRoutes);
app.use('/books', bookRoutes);
app.use('/', reviewRoutes);

app.listen(port, async () => {
  await connectDB();
  console.log(`Server is running at http://localhost:${port}`);
});
