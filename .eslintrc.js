module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: "airbnb-base",
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "linebreak-style": 0,
    quotes: ["error", "double"],
    "import/newline-after-import": "off",
    "max-len": "off",
  },
};
