export class ApplicationError extends Error {
  /**
   * @param {string} message
   * @param {string} [code]
   * @param {{ cause?: unknown }} [options]
   */
  constructor(message, code = 'APPLICATION_ERROR', options = {}) {
    // @ts-ignore - Node supports `cause`, and bundlers will pass it through.
    super(message, options);
    this.name = 'ApplicationError';
    this.code = code;
  }
}

export class ValidationError extends ApplicationError {
  constructor(message, options = {}) {
    super(message, 'VALIDATION_ERROR', options);
    this.name = 'ValidationError';
  }
}

export class InfrastructureError extends ApplicationError {
  constructor(message, options = {}) {
    super(message, 'INFRASTRUCTURE_ERROR', options);
    this.name = 'InfrastructureError';
  }
}
