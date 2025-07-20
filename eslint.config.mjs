import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import tailwindcss from "eslint-plugin-tailwindcss"; // 🧠 plugin import

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Flat config array
const eslintConfig = [
  // ✅ Old-school config converted to flat format
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // ✅ Tailwind plugin rules
  {
    name: "tailwind",
    plugins: {
      tailwindcss,
    },
    rules: {
      "tailwindcss/classnames-order": "warn",
      "tailwindcss/no-custom-classname": "off", // set to "error" if you want strict naming
    },
  },
];

export default eslintConfig;
