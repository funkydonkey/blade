export interface OptimizationResult {
  optimized: string;
  explanation: string;
  improvementPercentage?: number;
}

export interface OptimizationContext {
  parsedStructure?: any;
  context?: string;
  excelVersion?: string;
}

export abstract class AIProvider {
  protected buildPrompt(formula: string, context?: OptimizationContext): string {
    return `You are an Excel formula optimization expert.

Analyze the following Excel formula and provide an optimized version.

Requirements:
1. The optimized formula MUST produce the same result as the original
2. Make the formula shorter and more efficient if possible
3. Use modern Excel functions when available (IFS instead of nested IF, XLOOKUP instead of VLOOKUP, etc.)
4. Remove redundant calculations
5. Improve readability while maintaining correctness

Original formula: ${formula}

${context?.context ? `Context: ${context.context}` : ''}

Respond in JSON format:
{
  "optimized": "=OPTIMIZED_FORMULA_HERE",
  "explanation": "Brief explanation of what was improved and why",
  "improvementPercentage": 0-100
}

If the formula is already optimal, return it unchanged with improvement percentage of 0.`;
  }

  abstract optimizeFormula(
    formula: string,
    context?: OptimizationContext
  ): Promise<OptimizationResult>;
}
