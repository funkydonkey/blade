import { GoogleGenerativeAI } from '@google/generative-ai';
import { AIProvider, OptimizationResult, OptimizationContext } from './base';

export class GoogleProvider extends AIProvider {
  private client: GoogleGenerativeAI;

  constructor(apiKey: string) {
    super();
    this.client = new GoogleGenerativeAI(apiKey);
  }

  async optimizeFormula(
    formula: string,
    context?: OptimizationContext
  ): Promise<OptimizationResult> {
    const prompt = this.buildPrompt(formula, context);
    const model = this.client.getGenerativeModel({ model: 'gemini-pro' });

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Failed to parse JSON from Google response');
    }

    const parsed = JSON.parse(jsonMatch[0]);
    return {
      optimized: parsed.optimized,
      explanation: parsed.explanation,
      improvementPercentage: parsed.improvementPercentage
    };
  }
}
