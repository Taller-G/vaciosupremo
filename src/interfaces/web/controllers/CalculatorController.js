import { ApplicationError } from '../../../application/errors/ApplicationError.js';

export class CalculatorController {
  /**
   * @param {{ calculateUseCase: { execute(dto: { a: number, b: number, operation: 'add' | 'subtract' }): Promise<{ result: number }> } }} deps
   */
  constructor({ calculateUseCase }) {
    this.calculateUseCase = calculateUseCase;
  }

  /**
   * @param {{ a: number, b: number, operation: 'add' | 'subtract' }} input
   * @returns {Promise<{ result: number } | { error: string }>}
   */
  async handle(input) {
    try {
      const output = await this.calculateUseCase.execute({
        a: input.a,
        b: input.b,
        operation: input.operation,
      });
      return output;
    } catch (err) {
      if (err instanceof ApplicationError) {
        return { error: err.message };
      }

      // Unknown error: avoid leaking details.
      return { error: 'Unexpected error' };
    }
  }
}
