module.exports = {
  root: true,
  // env: {
  //   commonjs: true,
  //   node: true,
  //   browser: true,
  //   es6: true,
  //   jest: true,
  // },
  parser: '@typescript-eslint/parser',
  parserOptions: {    
    ecmaVersion: 7,    // 允许解析较新的ES特性    
    sourceType: 'module',    
    ecmaFeatures: {      
    }  
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    "plugin:eslint-plugin-aliss/recommended"
  ],
  plugins: [
    "@typescript-eslint",
    "aliss"
  ],
  rules: {
    "@typescript-eslint/ban-ts-ignore": "off",
    '@typescript-eslint/explicit-module-boundary-types' : 'off',
    '@typescript-eslint/no-unsafe-assignment' : 'off',
    '@typescript-eslint/no-unsafe-call' : 'off',
    '@typescript-eslint/no-var-requires' : 'off',
    '@typescript-eslint/ban-ts-comment' : 'off',
    '@typescript-eslint/no-unsafe-member-access' : 'off',
    '@typescript-eslint/restrict-template-expressions' : 'off',
    '@typescript-eslint/no-floating-promises' : 'off',
    '@typescript-eslint/no-explicit-any' : 'off',
  }
}