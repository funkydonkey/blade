/**
 * Excel Formula Beautifier
 * Formats Excel formulas with proper indentation and line breaks for readability
 * Ported from Python implementation in stunning-enigma
 */

export class FormulaBeautifier {
  // Functions that benefit from multi-line formatting
  private static readonly MULTILINE_FUNCTIONS = new Set([
    'IF', 'IFS', 'AND', 'OR', 'NOT', 'XOR',
    'SUMIF', 'SUMIFS', 'COUNTIF', 'COUNTIFS', 'AVERAGEIF', 'AVERAGEIFS',
    'LET', 'LAMBDA', 'FILTER', 'SORT', 'SORTBY',
    'VLOOKUP', 'HLOOKUP', 'XLOOKUP', 'INDEX', 'MATCH',
    'SWITCH', 'CHOOSE'
  ]);

  private indentSize: number;

  constructor(indentSize: number = 4) {
    this.indentSize = indentSize;
  }

  /**
   * Main beautify method - formats an Excel formula with proper indentation
   * @param formula - The Excel formula to beautify (with or without leading =)
   * @returns Beautified formula string
   */
  public beautify(formula: string): string {
    try {
      const trimmed = formula.trim();
      const hasEquals = trimmed.startsWith('=');

      // Remove leading = for processing
      let processFormula = hasEquals ? trimmed.substring(1) : trimmed;

      // Format the expression
      const formatted = this._formatExpression(processFormula, 0);

      // Re-add leading = if it was present
      return hasEquals ? '=' + formatted : formatted;
    } catch (error) {
      // Fail-safe: return original formula if parsing fails
      console.error('Beautifier error:', error);
      return formula;
    }
  }

  /**
   * Recursively formats an expression with proper indentation
   * @param expr - Expression to format
   * @param depth - Current nesting depth
   * @returns Formatted expression
   */
  private _formatExpression(expr: string, depth: number): string {
    expr = expr.trim();

    // Check if this is a function call
    const funcMatch = expr.match(/^([A-Z_][A-Z0-9_.]*)\s*\(/i);

    if (!funcMatch) {
      // Not a function, return as-is
      return expr;
    }

    const funcName = funcMatch[1].toUpperCase();
    const openParenIndex = expr.indexOf('(');

    // Find matching closing parenthesis
    const closeParenIndex = this._findMatchingParen(expr, openParenIndex);

    if (closeParenIndex === -1) {
      // Malformed formula, return as-is
      return expr;
    }

    // Extract arguments string
    const argsStr = expr.substring(openParenIndex + 1, closeParenIndex);
    const remainingStr = expr.substring(closeParenIndex + 1);

    // Split arguments
    const args = this._splitArguments(argsStr);

    // Decide whether to use multi-line formatting
    const shouldMultiline = FormulaBeautifier.MULTILINE_FUNCTIONS.has(funcName) && args.length > 1;

    if (shouldMultiline) {
      // Multi-line formatting
      const formattedArgs = this._formatMultilineArgs(args, depth + 1);
      return `${funcName}(\n${formattedArgs}\n${this._indent(depth)})${remainingStr}`;
    } else {
      // Single-line formatting (but recursively format each argument)
      const formattedArgs = args
        .map(arg => this._formatExpression(arg, depth + 1))
        .join(',');
      return `${funcName}(${formattedArgs})${remainingStr}`;
    }
  }

  /**
   * Splits arguments at top-level commas only (respecting nested functions and strings)
   * @param argsStr - Arguments string to split
   * @returns Array of argument strings
   */
  private _splitArguments(argsStr: string): string[] {
    const args: string[] = [];
    let currentArg = '';
    let depth = 0;
    let inString = false;
    let stringChar = '';
    let i = 0;

    while (i < argsStr.length) {
      const char = argsStr[i];

      // Handle escape sequences
      if (char === '\\' && i + 1 < argsStr.length) {
        currentArg += char + argsStr[i + 1];
        i += 2;
        continue;
      }

      // Handle string literals
      if ((char === '"' || char === "'") && !inString) {
        inString = true;
        stringChar = char;
        currentArg += char;
        i++;
        continue;
      }

      if (char === stringChar && inString) {
        inString = false;
        stringChar = '';
        currentArg += char;
        i++;
        continue;
      }

      // If we're inside a string, just add the character
      if (inString) {
        currentArg += char;
        i++;
        continue;
      }

      // Track parenthesis depth
      if (char === '(') {
        depth++;
        currentArg += char;
        i++;
        continue;
      }

      if (char === ')') {
        depth--;
        currentArg += char;
        i++;
        continue;
      }

      // Split on comma only at depth 0
      if (char === ',' && depth === 0) {
        args.push(currentArg.trim());
        currentArg = '';
        i++;
        continue;
      }

      currentArg += char;
      i++;
    }

    // Add the last argument
    if (currentArg.trim()) {
      args.push(currentArg.trim());
    }

    return args;
  }

  /**
   * Finds the index of the matching closing parenthesis
   * @param text - Text to search
   * @param start - Index of opening parenthesis
   * @returns Index of matching closing parenthesis, or -1 if not found
   */
  private _findMatchingParen(text: string, start: number): number {
    let depth = 0;
    let inString = false;
    let stringChar = '';

    for (let i = start; i < text.length; i++) {
      const char = text[i];

      // Handle string literals
      if ((char === '"' || char === "'") && !inString && (i === 0 || text[i - 1] !== '\\')) {
        inString = true;
        stringChar = char;
        continue;
      }

      if (char === stringChar && inString && text[i - 1] !== '\\') {
        inString = false;
        stringChar = '';
        continue;
      }

      // Skip characters inside strings
      if (inString) {
        continue;
      }

      if (char === '(') {
        depth++;
      } else if (char === ')') {
        depth--;
        if (depth === 0) {
          return i;
        }
      }
    }

    return -1; // No matching parenthesis found
  }

  /**
   * Formats arguments in multi-line style with proper indentation
   * @param args - Array of arguments
   * @param depth - Current nesting depth
   * @returns Formatted arguments string
   */
  private _formatMultilineArgs(args: string[], depth: number): string {
    return args
      .map((arg, index) => {
        const formattedArg = this._formatExpression(arg, depth);
        const comma = index < args.length - 1 ? ',' : '';
        return `${this._indent(depth)}${formattedArg}${comma}`;
      })
      .join('\n');
  }

  /**
   * Generates indentation string for the given depth
   * @param depth - Nesting depth
   * @returns Indentation string (spaces)
   */
  private _indent(depth: number): string {
    return ' '.repeat(depth * this.indentSize);
  }
}

/**
 * Convenience function to beautify a formula with default settings
 * @param formula - Formula to beautify
 * @returns Beautified formula
 */
export function beautifyFormula(formula: string): string {
  const beautifier = new FormulaBeautifier();
  return beautifier.beautify(formula);
}
