import express, { Express, Response } from 'express';
import cors from 'cors';
import colors from 'colors';
import rolesRoutes from '@/routes/rolesRoute';
import usersRoutes from '@/routes/usersRoute';
import tasksRoutes from '@/routes/tasksRoute';
import morgan from 'morgan';
import status from 'http-status';
import variables from './variables';
import { login } from './controllers/Auth';

// * target
// * roles => users => tasks

// ? init app
const app: Express = express();

// ? app middleware
app.use(cors());
app.options('*', cors());
app.use(express.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(morgan(':method :url'));

// ? root route
app.get('/api', (_, res: Response) => {
  res.status(200).json({ status: 'server is working smoothly' });
});

// ? auth
app.post('/api/login', login);
// ? define routes
app.use('/api/roles', rolesRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/tasks', tasksRoutes);

// ? not found end point
app.use('*', (_, res) => {
  res.status(404).json({ message: status['404_MESSAGE'] });
});

app.listen(variables.port, () => {
  // eslint-disable-next-line no-console
  console.log(colors.green(`app listening on port :${variables.port}`));
});
