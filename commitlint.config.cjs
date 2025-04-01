const typesWithScopeOptional = [
  'build',
  'chore',
  'docs',
  'feat',
  'fix',
  'perf',
  'refactor',
  'revert',
  'style',
  'test',
];

module.exports = {
  extends: ['@commitlint/config-conventional'],
  plugins: ['commitlint-plugin-function-rules'],
  rules: {
    'scope-empty': [0],
    'function-rules/scope-empty': [
      2,
      'always',
      (parsed) => {
        const { type } = parsed;

        if (typesWithScopeOptional.includes(type)) return [true];

        return [
          false,
          `Scoping is optional on these commit types: ${typesWithScopeOptional.join(', ')}`,
        ];
      },
    ],
    'scope-enum': [0],
    'function-rules/scope-enum': [
      2,
      'always',
      (parsed) => {
        const { type, scope } = parsed;

        if (typesWithScopeOptional.includes(type) || scope !== null) return [true];

        const scopeRegexValidation = /[#][0-9]{1,8}|^[a-z0-9-_]+(\/[a-z0-9-_]+)*$/;
        const isValidScope = scopeRegexValidation.test(scope);

        if (isValidScope) return [true];

        return [
          false,
          `The scope must follow the pattern #<task number> or be a name (Example: '#123456' or 'ui/button'). Scoping is optional for types: ${typesWithScopeOptional.join(', ')}`,
        ];
      },
    ],
    'header-max-length': [2, 'always', 72],
    'body-max-line-length': [2, 'always', 100],
  },
};
