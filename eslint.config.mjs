import { defineConfig, globalIgnores } from "eslint/config";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import tseslint from 'typescript-eslint';

export default defineConfig([
    globalIgnores(["**/*.test.*", "**/*.mjs"]),
    {
        extends: [
            ...nextCoreWebVitals,
            tseslint.configs.strictTypeChecked,
            {
                languageOptions: {
                    parserOptions: {
                        projectService: true,
                    },
                },
            },
        ]
    }
]);