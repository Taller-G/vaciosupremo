import { UserRepository } from '../../domain/repositories/UserRepository.js';
import { User } from '../../domain/entities/User.js';
import { UserName } from '../../domain/value-objects/UserName.js';
import { InfrastructureError } from '../../application/errors/ApplicationError.js';

/**
 * Browser-only repository implementation using localStorage.
 * Demonstrates infrastructure fulfilling a domain repository interface.
 */
export class LocalStorageUserRepository extends UserRepository {
  /**
   * @param {{ storageKey?: string, storage?: Storage }} [deps]
   */
  constructor(deps = {}) {
    super();
    this.storageKey = deps.storageKey ?? 'custom.users';
    this.storage = deps.storage ?? (typeof localStorage !== 'undefined' ? localStorage : null);
  }

  /**
   * @returns {Record<string, { id: string, name: string }>}
   */
  _readAll() {
    if (!this.storage) return {};

    try {
      const raw = this.storage.getItem(this.storageKey);
      if (!raw) return {};
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== 'object') return {};
      return /** @type {Record<string, { id: string, name: string }>} */ (parsed);
    } catch (cause) {
      throw new InfrastructureError('Failed to read from localStorage', { cause });
    }
  }

  /**
   * @param {Record<string, { id: string, name: string }>} data
   */
  _writeAll(data) {
    if (!this.storage) return;

    try {
      this.storage.setItem(this.storageKey, JSON.stringify(data));
    } catch (cause) {
      throw new InfrastructureError('Failed to write to localStorage', { cause });
    }
  }

  /**
   * @param {string} id
   */
  async getById(id) {
    const all = this._readAll();
    const row = all[id];
    if (!row) return null;

    // Map persistence shape -> domain entity
    return new User({ id: row.id, name: new UserName(row.name) });
  }

  /**
   * @param {User} user
   */
  async save(user) {
    const all = this._readAll();

    all[user.id] = {
      id: user.id,
      name: user.name.toString()
    };

    this._writeAll(all);
  }
}
