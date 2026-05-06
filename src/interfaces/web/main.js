import { GetWelcomeMessageUseCase } from '../../application/use-cases/GetWelcomeMessageUseCase.js';
import { WelcomeController } from './controllers/WelcomeController.js';

const form = document.getElementById('welcome-form');
const nameInput = document.getElementById('name');
const outputEl = document.getElementById('welcome-output');

if (!(form instanceof HTMLFormElement)) {
  throw new Error('welcome-form not found');
}
if (!(nameInput instanceof HTMLInputElement)) {
  throw new Error('name input not found');
}
if (!(outputEl instanceof HTMLOutputElement)) {
  throw new Error('welcome-output not found');
}

const getWelcomeMessageUseCase = new GetWelcomeMessageUseCase();
const controller = new WelcomeController({ getWelcomeMessageUseCase });

/**
 * @param {string} text
 * @param {{ variant?: 'error' | 'default' }} [opts]
 */
function setOutput(text, opts = {}) {
  outputEl.textContent = text;
  outputEl.dataset.variant = opts.variant ?? 'default';
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Interfaces layer is allowed to do input/schema validation.
  const name = nameInput.value;
  if (typeof name !== 'string' || name.trim().length === 0) {
    setOutput('Please enter your name.', { variant: 'error' });
    return;
  }

  setOutput('…');

  const result = await controller.handle({ name });
  if ('error' in result) {
    setOutput(result.error, { variant: 'error' });
  } else {
    setOutput(result.message);
  }
});
