module.exports = {
  root: true,
  extends: ["universe/native", 'plugin:prettier/recommended', 'airbnb', 'airbnb/hooks'],
  plugins: ['prettier'],
  rules: {
    "eslint-disable-next-line react-hooks/rules-of-hooks": 0,
  },
  trailingComma: "es5",
  tabWidth: 4,
  semi: true,
  useTabs: false,
};
