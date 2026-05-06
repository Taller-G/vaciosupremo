import { DomainError } from '../errors/DomainError.js';

export class UserName {
  /**
   * @param {string} value
   */
  constructor(value) {
    if (typeof value !== 'string') {
      throw new DomainError('UserName must be a string', 'INVALID_USER_NAME');
    }

    const trimmed = value.trim();
    if (trimmed.length < 1) {
      throw new DomainError('UserName cannot be empty', 'INVALID_USER_NAME');
    }

    if (trimmed.length > 50) {
      throw new DomainError('UserName must be 50 characters or fewer', 'INVALID_USER_NAME');
    }

    /** @readonly */
    this.value = trimmed;
    Object.freeze(this);
  }

  /**
   * @param {UserName} other
   */
  equals(other) {
    return other instanceof UserName && other.value === this.value;
  }

  toString() {
    return this.value;
  }
}
