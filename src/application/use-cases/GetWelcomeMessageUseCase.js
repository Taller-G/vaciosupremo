import { User } from '../../domain/entities/User.js';
import { UserName } from '../../domain/value-objects/UserName.js';
import { WelcomeMessageService } from '../../domain/services/WelcomeMessageService.js';
import { ValidationError } from '../errors/ApplicationError.js';

export class GetWelcomeMessageUseCase {
  constructor() {
    this.welcomeMessageService = new WelcomeMessageService();
  }

  /**
   * @param {import('../dtos/GetWelcomeMessageDTO.js').GetWelcomeMessageInputDTO} dto
   * @returns {Promise<import('../dtos/GetWelcomeMessageDTO.js').GetWelcomeMessageOutputDTO>}
   */
  async execute(dto) {
    if (!dto || typeof dto.name !== 'string') {
      throw new ValidationError('"name" is required');
    }

    const id =
      typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
        ? crypto.randomUUID()
        : `user_${Date.now()}`;

    const user = new User({ id, name: new UserName(dto.name) });
    const message = this.welcomeMessageService.createWelcomeMessage(user);

    return { message };
  }
}
