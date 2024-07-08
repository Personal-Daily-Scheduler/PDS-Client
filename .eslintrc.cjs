module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "airbnb",
    "eslint:recommended",
    "plugin:react/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "detect" } },
  plugins: ["react", "prettier", "react-hooks"],
  rules: {
    semi: "warn",
    quotes: ["error", "double"],
    "no-unused-vars": "warn",
    "import/no-extraneous-dependencies": "off",
    "import/no-named-as-default": 0,
    "react/prop-types": "off",
    "react/button-has-type": "off",
    "react/jsx-props-no-spreading": "off",
    "react/jsx-no-bind": "off",
    "react/self-closing-comp": "off",
    "react/react-in-jsx-scope": "off",
    "react/jsx-filename-extension": ["warn", { extensions: [".js", ".jsx"] }],
    "no-param-reassign": 0,
    "no-restricted-syntax": ["error", "LabeledStatement", "WithStatement"],
    "no-underscore-dangle": "off",
    "react/jsx-no-target-blank": "off",
    "react/no-unstable-nested-components": "off",
    "consistent-return": "off",
    "guard-for-in": "off",
    "no-nested-ternary": "off",
    "no-new": "off",
    "max-len": "off",
    "no-trailing-spaces": "off",
  },
}
