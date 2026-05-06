import express from 'express';
import { UserController } from './controllers/UserController';

const app = express();
const userController = new UserController();
app.use(express.json());

app.post('/users', (req, res) => userController.create(req, res));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});