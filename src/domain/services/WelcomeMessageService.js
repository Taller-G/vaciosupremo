import { DomainError } from '../errors/DomainError.js';
import { User } from '../entities/User.js';

export class WelcomeMessageService {
  /**
   * @param {User} user
   */
  createWelcomeMessage(user) {
    if (!(user instanceof User)) {
      throw new DomainError('Expected a User entity', 'INVALID_USER');
    }

    return `Welcome, ${user.name.toString()}!`;
  }
}
