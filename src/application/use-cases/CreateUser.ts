import { User } from '../../domain/entities/User';
import { UserRepository } from '../../domain/repositories/UserRepository';
import { Email } from '../../domain/value-objects/Email';

export class CreateUser {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async execute(dto: { id: string; name: string; email: string }) {
        const email = new Email(dto.email);
        const user = new User(dto.id, dto.name);
        await this.userRepository.save(user);
        return user;
    }
}