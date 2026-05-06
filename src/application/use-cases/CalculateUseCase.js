import { CalculatorService } from '../../domain/services/CalculatorService.js';
import { ValidationError } from '../errors/ApplicationError.js';

export class CalculateUseCase {
  constructor() {
    this.calculatorService = new CalculatorService();
  }

  /**
   * @param {import('../dtos/CalculateDTO.js').CalculateInputDTO} dto
   * @returns {Promise<import('../dtos/CalculateDTO.js').CalculateOutputDTO>}
   */
  async execute(dto) {
    if (!dto || typeof dto.a !== 'number' || typeof dto.b !== 'number') {
      throw new ValidationError('"a" and "b" must be numbers');
    }

    if (dto.operation !== 'add' && dto.operation !== 'subtract') {
      throw new ValidationError('"operation" must be "add" or "subtract"');
    }

    const result =
      dto.operation === 'add'
        ? this.calculatorService.add(dto.a, dto.b)
        : this.calculatorService.subtract(dto.a, dto.b);

    return { result };
  }
}
