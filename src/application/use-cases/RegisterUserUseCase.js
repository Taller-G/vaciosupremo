import { User } from '../../domain/entities/User.js';
import { UserName } from '../../domain/value-objects/UserName.js';
import { ValidationError } from '../errors/ApplicationError.js';

export class RegisterUserUseCase {
  /**
   * @param {{ userRepository: import('../../domain/repositories/UserRepository.js').UserRepository }} deps
   */
  constructor({ userRepository }) {
    this.userRepository = userRepository;
  }

  /**
   * @param {{ id: string, name: string }} dto
   * @returns {Promise<{ id: string }>} 
   */
  async execute(dto) {
    if (!dto || typeof dto.id !== 'string' || typeof dto.name !== 'string') {
      throw new ValidationError('"id" and "name" are required');
    }

    const user = new User({ id: dto.id, name: new UserName(dto.name) });
    await this.userRepository.save(user);

    return { id: user.id };
  }
}
