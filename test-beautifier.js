// Simple manual test for beautifier
// Run with: node test-beautifier.js

class FormulaBeautifier {
  static MULTILINE_FUNCTIONS = new Set([
    'IF', 'IFS', 'AND', 'OR', 'NOT', 'XOR',
    'SUMIF', 'SUMIFS', 'COUNTIF', 'COUNTIFS', 'AVERAGEIF', 'AVERAGEIFS',
    'LET', 'LAMBDA', 'FILTER', 'SORT', 'SORTBY',
    'VLOOKUP', 'HLOOKUP', 'XLOOKUP', 'INDEX', 'MATCH',
    'SWITCH', 'CHOOSE'
  ]);

  constructor(indentSize = 4) {
    this.indentSize = indentSize;
  }

  beautify(formula) {
    try {
      const trimmed = formula.trim();
      const hasEquals = trimmed.startsWith('=');
      let processFormula = hasEquals ? trimmed.substring(1) : trimmed;
      const formatted = this._formatExpression(processFormula, 0);
      return hasEquals ? '=' + formatted : formatted;
    } catch (error) {
      console.error('Beautifier error:', error);
      return formula;
    }
  }

  _formatExpression(expr, depth) {
    expr = expr.trim();
    const funcMatch = expr.match(/^([A-Z_][A-Z0-9_.]*)\s*\(/i);

    if (!funcMatch) {
      return expr;
    }

    const funcName = funcMatch[1].toUpperCase();
    const openParenIndex = expr.indexOf('(');
    const closeParenIndex = this._findMatchingParen(expr, openParenIndex);

    if (closeParenIndex === -1) {
      return expr;
    }

    const argsStr = expr.substring(openParenIndex + 1, closeParenIndex);
    const remainingStr = expr.substring(closeParenIndex + 1);
    const args = this._splitArguments(argsStr);
    const shouldMultiline = FormulaBeautifier.MULTILINE_FUNCTIONS.has(funcName) && args.length > 1;

    if (shouldMultiline) {
      const formattedArgs = this._formatMultilineArgs(args, depth + 1);
      return `${funcName}(\n${formattedArgs}\n${this._indent(depth)})${remainingStr}`;
    } else {
      const formattedArgs = args
        .map(arg => this._formatExpression(arg, depth + 1))
        .join(',');
      return `${funcName}(${formattedArgs})${remainingStr}`;
    }
  }

  _splitArguments(argsStr) {
    const args = [];
    let currentArg = '';
    let depth = 0;
    let inString = false;
    let stringChar = '';
    let i = 0;

    while (i < argsStr.length) {
      const char = argsStr[i];

      if (char === '\\' && i + 1 < argsStr.length) {
        currentArg += char + argsStr[i + 1];
        i += 2;
        continue;
      }

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

      if (inString) {
        currentArg += char;
        i++;
        continue;
      }

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

      if (char === ',' && depth === 0) {
        args.push(currentArg.trim());
        currentArg = '';
        i++;
        continue;
      }

      currentArg += char;
      i++;
    }

    if (currentArg.trim()) {
      args.push(currentArg.trim());
    }

    return args;
  }

  _findMatchingParen(text, start) {
    let depth = 0;
    let inString = false;
    let stringChar = '';

    for (let i = start; i < text.length; i++) {
      const char = text[i];

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

    return -1;
  }

  _formatMultilineArgs(args, depth) {
    return args
      .map((arg, index) => {
        const formattedArg = this._formatExpression(arg, depth);
        const comma = index < args.length - 1 ? ',' : '';
        return `${this._indent(depth)}${formattedArg}${comma}`;
      })
      .join('\n');
  }

  _indent(depth) {
    return ' '.repeat(depth * this.indentSize);
  }
}

// Test cases
console.log('Testing Formula Beautifier...\n');

const beautifier = new FormulaBeautifier();

const testCases = [
  {
    name: 'Simple IF',
    input: '=IF(A1>0,"Yes","No")',
  },
  {
    name: 'Nested IF',
    input: '=IF(A1>100,IF(A1<200,"Medium",IF(A1>=200,"High","")),"Low")',
  },
  {
    name: 'SUMIFS',
    input: '=SUMIFS(C1:C1000,A1:A1000,">0",B1:B1000,"Yes")',
  },
  {
    name: 'Complex nested',
    input: '=IF(AND(A1>0,B1<10),IF(C1="Yes","OK","NO"),"FAIL")',
  },
  {
    name: 'Quoted string with comma',
    input: '=IF(A1>0,"Hello, World","Goodbye")',
  },
  {
    name: 'VLOOKUP',
    input: '=VLOOKUP(A2,$D$1:$F$100,2,FALSE)',
  }
];

testCases.forEach(test => {
  console.log(`\n=== ${test.name} ===`);
  console.log('Input:');
  console.log(test.input);
  console.log('\nOutput:');
  const result = beautifier.beautify(test.input);
  console.log(result);
  console.log('-'.repeat(60));
});

console.log('\n✓ All tests completed!');
