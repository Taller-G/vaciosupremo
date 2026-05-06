import { GetWelcomeMessageUseCase } from '../../application/use-cases/GetWelcomeMessageUseCase.js';
import { WelcomeController } from './controllers/WelcomeController.js';
import { CalculateUseCase } from '../../application/use-cases/CalculateUseCase.js';
import { CalculatorController } from './controllers/CalculatorController.js';

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

// ── Calculator ────────────────────────────────────────────────────────────────

const calcForm = document.getElementById('calculator-form');
const operandAInput = document.getElementById('operand-a');
const operandBInput = document.getElementById('operand-b');
const calcOutputEl = document.getElementById('calculator-output');

if (!(calcForm instanceof HTMLFormElement)) {
  throw new Error('calculator-form not found');
}
if (!(operandAInput instanceof HTMLInputElement)) {
  throw new Error('operand-a input not found');
}
if (!(operandBInput instanceof HTMLInputElement)) {
  throw new Error('operand-b input not found');
}
if (!(calcOutputEl instanceof HTMLOutputElement)) {
  throw new Error('calculator-output not found');
}

const calculateUseCase = new CalculateUseCase();
const calculatorController = new CalculatorController({ calculateUseCase });

/**
 * @param {string} text
 * @param {{ variant?: 'error' | 'default' }} [opts]
 */
function setCalcOutput(text, opts = {}) {
  calcOutputEl.textContent = text;
  calcOutputEl.dataset.variant = opts.variant ?? 'default';
}

calcForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const submitter = /** @type {HTMLButtonElement | null} */ (event.submitter);
  const operation = submitter?.value;

  if (operation !== 'add' && operation !== 'subtract') {
    setCalcOutput('Unknown operation.', { variant: 'error' });
    return;
  }

  const a = parseFloat(operandAInput.value);
  const b = parseFloat(operandBInput.value);

  if (isNaN(a) || isNaN(b)) {
    setCalcOutput('Please enter valid numbers in both fields.', { variant: 'error' });
    return;
  }

  setCalcOutput('…');

  const result = await calculatorController.handle({ a, b, operation });
  if ('error' in result) {
    setCalcOutput(result.error, { variant: 'error' });
  } else {
    const symbol = operation === 'add' ? '+' : '−';
    setCalcOutput(`${a} ${symbol} ${b} = ${result.result}`);
  }
});

// ── Welcome ───────────────────────────────────────────────────────────────────

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
