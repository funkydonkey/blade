import axios from 'axios';
import { AIProvider, OptimizationResult, OptimizationContext } from './base';

export class OllamaProvider extends AIProvider {
  private baseUrl: string;

  constructor(baseUrl: string) {
    super();
    this.baseUrl = baseUrl;
  }

  async optimizeFormula(
    formula: string,
    context?: OptimizationContext
  ): Promise<OptimizationResult> {
    const prompt = this.buildPrompt(formula, context);

    const response = await axios.post(`${this.baseUrl}/api/generate`, {
      model: 'llama2',
      prompt,
      stream: false,
      format: 'json'
    });

    const text = response.data.response;

    // Parse JSON response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Failed to parse JSON from Ollama response');
    }

    const result = JSON.parse(jsonMatch[0]);
    return {
      optimized: result.optimized,
      explanation: result.explanation,
      improvementPercentage: result.improvementPercentage
    };
  }
}
