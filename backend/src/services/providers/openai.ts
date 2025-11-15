import OpenAI from 'openai';
import { AIProvider, OptimizationResult, OptimizationContext } from './base';

export class OpenAIProvider extends AIProvider {
  private client: OpenAI;

  constructor(apiKey: string) {
    super();
    this.client = new OpenAI({ apiKey });
  }

  async optimizeFormula(
    formula: string,
    context?: OptimizationContext
  ): Promise<OptimizationResult> {
    const prompt = this.buildPrompt(formula, context);

    const response = await this.client.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: 'You are an Excel formula optimization expert. Always respond with valid JSON.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.3,
      max_tokens: 1000
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error('No response from OpenAI');
    }

    const result = JSON.parse(content);
    return {
      optimized: result.optimized,
      explanation: result.explanation,
      improvementPercentage: result.improvementPercentage
    };
  }
}
