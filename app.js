import express from 'express';
import taskRouter from './routes/taskRouter.js';

const app = express();
app.use(express.json());
app.use('/tasks', taskRouter);

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
