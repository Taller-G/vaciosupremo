import { Request, Response } from 'express';
import { CreateUser } from '../../application/use-cases/CreateUser';
import { InMemoryUserRepository } from '../../infrastructure/repositories/InMemoryUserRepository';

const userRepository = new InMemoryUserRepository();
const createUser = new CreateUser(userRepository);

export class UserController {
    async create(req: Request, res: Response) {
        try {
            const user = await createUser.execute(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}