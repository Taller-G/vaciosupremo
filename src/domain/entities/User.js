import { DomainError } from '../errors/DomainError.js';
import { UserName } from '../value-objects/UserName.js';

export class User {
  /**
   * @param {{ id: string, name: UserName }} params
   */
  constructor({ id, name }) {
    if (typeof id !== 'string' || id.trim().length === 0) {
      throw new DomainError('User id must be a non-empty string', 'INVALID_USER_ID');
    }

    if (!(name instanceof UserName)) {
      throw new DomainError('User name must be a UserName value object', 'INVALID_USER_NAME');
    }

    this.id = id;
    this.name = name;

    Object.freeze(this);
  }
}
