module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ["eslint:recommended", "airbnb", "airbnb-typescript", "prettier", "plugin:prettier/recommended", "next"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json", // TypeScript 구성 파일의 경로를 명시
  },
  rules: {
    "linebreak-style": 0,
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
    "import/no-named-as-default": "off", // 이 규칙 비활성화
  },
  ignorePatterns: [".eslintrc.js"],
};
