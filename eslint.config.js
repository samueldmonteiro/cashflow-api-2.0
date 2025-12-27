import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // Configuração padrão do projeto
  {
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
    },
    rules: {
      semi: ['error', 'always'],
      quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
      indent: ['error', 2, { SwitchCase: 1 }],
      '@typescript-eslint/no-explicit-any': 'off',
    },
  }
];