import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';
import eslintConfigPrettier from 'eslint-config-prettier';

import importPlugin from 'eslint-plugin-import';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';
import reactNativePlugin from 'eslint-plugin-react-native';

export default [
    {
        files: ['**/*.{js,mjs,cjs,jsx}'],
        languageOptions: {
            parserOptions: {
                ecmaFeatures: { jsx: true },
                ecmaVersion: 2024,
                sourceType: 'module',
            },
            globals: globals.browser,
        },
        plugins: {
            import: importPlugin,
            'react-hooks': reactHooksPlugin,
            'react-refresh': reactRefreshPlugin,
            'react-native': reactNativePlugin,
        },
        rules: {
            // React 관련 규칙
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],
            'react/react-in-jsx-scope': 'off', // React 17 이후 필요 없음
            'react/prop-types': 'off', // PropTypes 비활성화 (필요 시 활성화)

            // React Native 관련 규칙
            'react-native/no-unused-styles': 'warn',
            'react-native/split-platform-components': 'warn',
            'react-native/no-inline-styles': 'warn',
            'react-native/no-color-literals': 'warn',
            'react-native/no-raw-text': 'warn',
            'react-native/no-single-element-style-arrays': 'warn',

            // Hooks 관련 규칙
            'react-hooks/rules-of-hooks': 'error', // Hooks 규칙 강제
            'react-hooks/exhaustive-deps': 'warn', // 의존성 배열 관리

            // import 관련 규칙
            'import/named': 'error',
            'import/default': 'error',
            'import/namespace': 'error',
            'import/no-unresolved': 'error',
            'import/no-unused-modules': [
                'warn',
                {
                    unusedExports: true,
                    missingExports: true,
                    src: ['src/**/*.{js,jsx}'],
                },
            ],
            'import/no-deprecated': 'warn',
            'import/no-duplicates': 'warn',
            'import/first': 'warn',

            // 변수 처리 규칙
            'no-use-before-define': 'error', // 변수를 정의하기 전에 사용하면 오류
            'no-unused-vars': [
                'warn',
                { args: 'none', ignoreRestSiblings: true },
            ],
            'no-shadow': ['warn'],

            // 기타 규칙
            eqeqeq: 'warn', // // 엄격한 일치 연산자 사용 (===와 !==를 사용)
            curly: 'warn', // 제어문에 중괄호 사용
            'arrow-parens': ['warn', 'always'], // 화살표 함수에 파라미터 괄호처리
            camelcase: 'warn', // 카멜 케이스 사용하도록
            'no-console': 'warn', // console.log 같은 코드 제거하도록
        },
        settings: {
            react: { version: 'detect' },
            'import/resolver': {
                alias: {
                    map: [
                        ['/src', './src'],
                        ['/public', './public'],
                    ],
                    extensions: ['.js', '.jsx', '.mjs', '.cjs', '.svg'],
                },
            },
        },
    },
    pluginJs.configs.recommended,
    pluginReactConfig,
    eslintConfigPrettier,
];
