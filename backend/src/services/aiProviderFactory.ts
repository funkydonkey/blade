import { OpenAIProvider } from './providers/openai';
import { AnthropicProvider } from './providers/anthropic';
import { GoogleProvider } from './providers/google';
import { OllamaProvider } from './providers/ollama';
import { AIProvider } from './providers/base';

export class AIProviderFactory {
  static create(provider: string, apiKey?: string): AIProvider {
    const key = apiKey || process.env[`${provider.toUpperCase()}_API_KEY`];

    switch (provider.toLowerCase()) {
      case 'openai':
        if (!key) throw new Error('OpenAI API key is required');
        return new OpenAIProvider(key);

      case 'anthropic':
        if (!key) throw new Error('Anthropic API key is required');
        return new AnthropicProvider(key);

      case 'google':
        if (!key) throw new Error('Google API key is required');
        return new GoogleProvider(key);

      case 'ollama':
        const baseUrl = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';
        return new OllamaProvider(baseUrl);

      default:
        throw new Error(`Unsupported AI provider: ${provider}`);
    }
  }
}
