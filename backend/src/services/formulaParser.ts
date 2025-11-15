export interface ParsedFormula {
  raw: string;
  functions: string[];
  cellReferences: string[];
  complexity: number;
}

export class FormulaParser {
  parse(formula: string): ParsedFormula {
    // Remove leading =
    const cleaned = formula.startsWith('=') ? formula.substring(1) : formula;

    // Extract functions
    const functionRegex = /([A-Z][A-Z0-9._]*)\s*\(/g;
    const functions: string[] = [];
    let match;
    while ((match = functionRegex.exec(cleaned)) !== null) {
      functions.push(match[1]);
    }

    // Extract cell references (e.g., A1, $A$1, Sheet1!A1)
    const cellRegex = /(?:[A-Z]+[0-9]+|\$[A-Z]+\$[0-9]+|[A-Z]+\$[0-9]+|\$[A-Z]+[0-9]+)/g;
    const cellReferences = cleaned.match(cellRegex) || [];

    // Calculate complexity score
    const complexity = this.calculateComplexity(cleaned, functions);

    return {
      raw: formula,
      functions: [...new Set(functions)],
      cellReferences: [...new Set(cellReferences)],
      complexity
    };
  }

  private calculateComplexity(formula: string, functions: string[]): number {
    let score = 0;

    // Base complexity from length
    score += Math.floor(formula.length / 10);

    // Add complexity for each function
    score += functions.length * 2;

    // Add complexity for nested functions
    const nestingLevel = this.getMaxNestingLevel(formula);
    score += nestingLevel * 3;

    // Add complexity for IF statements (they tend to make formulas complex)
    const ifCount = (formula.match(/IF\(/gi) || []).length;
    score += ifCount * 4;

    return score;
  }

  private getMaxNestingLevel(formula: string): number {
    let maxLevel = 0;
    let currentLevel = 0;

    for (const char of formula) {
      if (char === '(') {
        currentLevel++;
        maxLevel = Math.max(maxLevel, currentLevel);
      } else if (char === ')') {
        currentLevel--;
      }
    }

    return maxLevel;
  }
}
