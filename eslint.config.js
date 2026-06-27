// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require("eslint-config-expo/flat");

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ["dist/*"],
  },
  {
    rules: {
      // Reanimated shared values are mutated via `.value` by design; the
      // React Compiler immutability rule flags this as a false positive.
      "react-hooks/immutability": "off",
    },
  },
]);
