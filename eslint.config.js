import common from 'eslint-config-neon/flat/common.js';
import node from 'eslint-config-neon/flat/node.js';
import prettier from 'eslint-config-neon/flat/prettier.js';
import typescript from 'eslint-config-neon/flat/typescript.js';
import merge from 'lodash.merge';
import tseslint from 'typescript-eslint';

const commonFiles = '{js,mjs,cjs,ts,mts,cts,jsx,tsx}';

const project = ['tsconfig.eslint.json', 'services/*/tsconfig.eslint.json', 'packages/*/tsconfig.eslint.json'];

const commonRuleset = merge(...common, {
	files: [`**/*${commonFiles}`],
	rules: {
		'no-eq-null': ['off'],
		eqeqeq: ['error', 'always', { null: 'ignore' }],
		'jsdoc/no-undefined-types': ['off'],
		'import/no-duplicates': ['off'],
	},
});

const nodeRuleset = merge(...node, { files: [`**/*${commonFiles}`] });

const typeScriptRuleset = merge(...typescript, {
	files: [`**/*${commonFiles}`],
	languageOptions: {
		parserOptions: {
			warnOnUnsupportedTypeScriptVersion: false,
			allowAutomaticSingleRunInference: true,
			project,
		},
	},
	rules: {
		'@typescript-eslint/consistent-type-definitions': [2, 'interface'],
		'@typescript-eslint/naming-convention': [
			2,
			{
				selector: 'typeParameter',
				format: ['PascalCase'],
				custom: {
					regex: '^\\w{3,}',
					match: true,
				},
			},
		],
	},
	settings: {
		'import/resolver': {
			typescript: {
				project,
			},
		},
	},
});

const prettierRuleset = merge(...prettier, { files: [`**/*${commonFiles}`] });

export default tseslint.config(
	{
		ignores: ['**/node_modules/', '.git/', '**/dist/', '**/coverage/'],
	},
	commonRuleset,
	nodeRuleset,
	typeScriptRuleset,
	{
		rules: {
			'no-restricted-globals': ['off'],
			'n/prefer-global/url': ['off'],
			'n/prefer-global/url-search-params': ['off'],
		},
	},
	prettierRuleset,
);
