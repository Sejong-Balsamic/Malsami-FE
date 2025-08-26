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
    "react/no-array-index-key": "warn", // 이 규칙을 경고 수준으로 낮춤
  },
  ignorePatterns: [
    ".eslintrc.js",
    "CHANGELOG.md",
    "CHANGELOG.json",
    ".cursor/prompts/코드스타일_가이드라인_요약.md",
    "version.yml",
  ],
};
