import { ApplicationError } from '../../../application/errors/ApplicationError.js';

export class WelcomeController {
  /**
   * @param {{ getWelcomeMessageUseCase: { execute(dto: { name: string }): Promise<{ message: string }> } }} deps
   */
  constructor({ getWelcomeMessageUseCase }) {
    this.getWelcomeMessageUseCase = getWelcomeMessageUseCase;
  }

  /**
   * @param {{ name: string }} input
   * @returns {Promise<{ message: string } | { error: string }>}
   */
  async handle(input) {
    try {
      const output = await this.getWelcomeMessageUseCase.execute({ name: input.name });
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
