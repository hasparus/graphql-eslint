/**
 * Legacy config example, should be run with `ESLINT_USE_FLAT_CONFIG=false` environment variable in ESLint 9
 */

module.exports = {
  root: true,
  // ❗️ It's very important that you don't have any rules configured at the top-level config,
  // and to move all configurations into the overrides section. Since JavaScript rules
  // can't run on GraphQL files and vice versa, if you have rules configured at the top level,
  // they will try to also execute for all overrides, as ESLint's configs cascade
  overrides: [
    {
      files: ['*.js'],
      extends: ['eslint:recommended'],
    },
    {
      files: ['*.graphql'],
      parser: '@graphql-eslint/eslint-plugin',
      parserOptions: {
        graphQLConfig: {
          schema: 'schema.graphql',
          documents: ['query.graphql', 'fragment.graphql', 'fragment2.graphql'],
        },
      },
      plugins: ['@graphql-eslint'],
      rules: {
        '@graphql-eslint/require-selections': ['error', { fieldName: '_id' }],
        '@graphql-eslint/unique-fragment-name': 'error',
        '@graphql-eslint/no-anonymous-operations': 'error',
        '@graphql-eslint/naming-convention': [
          'error',
          {
            OperationDefinition: {
              style: 'PascalCase',
              forbiddenPrefixes: ['Query', 'Mutation', 'Subscription', 'Get'],
              forbiddenSuffixes: ['Query', 'Mutation', 'Subscription'],
            },
          },
        ],
        '@graphql-eslint/unique-enum-value-names': 'error',
        '@graphql-eslint/require-description': ['error', { FieldDefinition: true }],
      },
    },
  ],
};
