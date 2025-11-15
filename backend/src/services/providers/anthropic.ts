import Anthropic from '@anthropic-ai/sdk';
import { AIProvider, OptimizationResult, OptimizationContext } from './base';

export class AnthropicProvider extends AIProvider {
  private client: Anthropic;

  constructor(apiKey: string) {
    super();
    this.client = new Anthropic({ apiKey });
  }

  async optimizeFormula(
    formula: string,
    context?: OptimizationContext
  ): Promise<OptimizationResult> {
    const prompt = this.buildPrompt(formula, context);

    const response = await this.client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.3
    });

    const content = response.content[0];
    if (content.type !== 'text') {
      throw new Error('Unexpected response type from Anthropic');
    }

    // Extract JSON from response
    const jsonMatch = content.text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Failed to parse JSON from Anthropic response');
    }

    const result = JSON.parse(jsonMatch[0]);
    return {
      optimized: result.optimized,
      explanation: result.explanation,
      improvementPercentage: result.improvementPercentage
    };
  }
}
