module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:react-native/all',
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2024,
        sourceType: 'module',
    },
    plugins: [
        'import',
        'react',
        'react-hooks',
        'react-refresh',
        'react-native',
    ],
    rules: {
        ...require('eslint-plugin-import').configs.errors.rules,
        ...require('eslint-plugin-import').configs.warnings.rules,
        ...require('eslint-plugin-react').configs.recommended.rules,
        ...require('eslint-plugin-react-hooks').configs.recommended.rules,
        ...require('eslint-plugin-react-native').configs.all.rules,

        // 1) React 관련 규칙
        'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true },
        ],
        'react/react-in-jsx-scope': 'off', // React 17 이후 필요 없음
        'react/prop-types': 'off', // PropTypes 비활성화 (필요 시 활성화)
        'react/jsx-uses-react': 'warn', // React 변수가 JSX에서 사용되었는지 확인
        'react/jsx-uses-vars': 'warn', // 선언된 변수가 JSX에서 사용되었는지 확인

        // 2) React Native 관련 규칙
        'react-native/no-unused-styles': 'warn',
        'react-native/no-inline-styles': 'warn',
        'react-native/no-color-literals': 'warn',
        'react-native/no-raw-text': [
            'warn',
            {
                skip: ['St.GlobalText'], // Text 감싸서 커스텀 한 거니까 제외
            },
        ],

        // 3) Hooks 관련 규칙
        'react-hooks/rules-of-hooks': 'error', // Hooks 규칙 강제
        'react-hooks/exhaustive-deps': 'warn', // 의존성 배열 관리

        // 4) import 관련 규칙
        'import/named': 'error',
        'import/default': 'error',
        'import/namespace': 'off', // react-native 모듈 해석 못해서 꺼버림
        'import/no-unresolved': 'error',
        'import/no-unused-modules': [
            'warn',
            {
                unusedExports: true,
                missingExports: true,
                src: ['**/*.{js,jsx}'],
            },
        ],
        'import/no-deprecated': 'off', // react-native 모듈 해석 못해서 꺼버림
        'import/no-duplicates': 'warn',
        'import/first': 'warn',

        // 5) 변수 처리 규칙
        'no-use-before-define': 'error', // 변수를 정의하기 전에 사용하면 오류
        'no-unused-vars': ['error', { args: 'none', ignoreRestSiblings: true }],
        'no-shadow': ['warn'],

        // 6) 기타 규칙
        eqeqeq: 'warn', // 엄격한 일치 연산자 사용 (===와 !==를 사용)
        curly: 'warn', // 제어문에 중괄호 사용
        'arrow-parens': ['warn', 'always'], // 화살표 함수에 파라미터 괄호처리
        camelcase: 'warn', // 카멜 케이스 사용하도록
        'no-console': 'warn', // console.log 같은 코드 제거하도록
    },
    settings: {
        react: {
            version: 'detect',
        },
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'], // 사용할 확장자 목록
            },
        },
    },
};
