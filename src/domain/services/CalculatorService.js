import { DomainError } from '../errors/DomainError.js';

export class CalculatorService {
  /**
   * @param {number} a
   * @param {number} b
   * @returns {number}
   */
  add(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new DomainError('Both operands must be numbers', 'INVALID_OPERANDS');
    }
    return a + b;
  }

  /**
   * @param {number} a
   * @param {number} b
   * @returns {number}
   */
  subtract(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new DomainError('Both operands must be numbers', 'INVALID_OPERANDS');
    }
    return a - b;
  }
}
