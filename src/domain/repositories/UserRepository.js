// Repository interface (abstraction). Implementations live in infrastructure.
export class UserRepository {
  /**
   * @param {string} _id
   * @returns {Promise<import('../entities/User.js').User | null>}
   */
  async getById(_id) {
    throw new Error('UserRepository.getById not implemented');
  }

  /**
   * @param {import('../entities/User.js').User} _user
   * @returns {Promise<void>}
   */
  async save(_user) {
    throw new Error('UserRepository.save not implemented');
  }
}
