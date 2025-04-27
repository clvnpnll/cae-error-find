## Error Find

This is a simple quiz app that tests the grammar knowledge of users. This app fetches the activities and questions from an API, and then displays the score once the user is done answering all rounds of questions.

The app supports two modes/flows:

- Single Round flow: Shows all questions consecutively. This is treated as a single round of questions.
- Multiple Round flow: Shows one round of questions at a time. The user will be notified of transition between rounds of questions.

## Updating API Endpoints

The API URL for fetching the activities are configured via environment variables. Please refer below for the list of env variables

- `VITE_ACTIVITIES_API_URL`: URL to fetch the list of activities and questions

Once done updating the necessary env variables, trigger a deployment to reflect the changes.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
