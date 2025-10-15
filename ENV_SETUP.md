# Environment Setup

## OpenAI API Configuration

To use the vacation guide app, you need to configure your OpenAI API key.

### Steps:

1. **Get your OpenAI API key:**
   - Go to [OpenAI Platform](https://platform.openai.com/api-keys)
   - Create a new API key if you don't have one

2. **Create a `.env.local` file** in the root directory of the project:
   ```bash
   # .env.local
   OPENAI_API_KEY=your_openai_api_key_here
   ```

3. **Replace** `your_openai_api_key_here` with your actual API key

4. **Restart the development server** if it's running:
   ```bash
   npm run dev
   ```

### Important Notes:
- Never commit your `.env.local` file to version control
- The `.env.local` file is already included in `.gitignore`
- Keep your API key secure and don't share it publicly

