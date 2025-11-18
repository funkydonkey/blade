import { FormulaBeautifier, beautifyFormula } from '../formulaBeautifier';

describe('FormulaBeautifier', () => {
  let beautifier: FormulaBeautifier;

  beforeEach(() => {
    beautifier = new FormulaBeautifier();
  });

  test('should beautify simple IF formula', () => {
    const formula = '=IF(A1>0,"Yes","No")';
    const result = beautifier.beautify(formula);

    expect(result).toContain('IF');
    expect(result).toContain('\n'); // Should have line breaks
    expect(result.startsWith('=')).toBe(true);
  });

  test('should beautify nested IF formulas', () => {
    const formula = '=IF(A1>100,IF(A1<200,"Medium",IF(A1>=200,"High","")),"Low")';
    const result = beautifier.beautify(formula);

    expect(result).toContain('IF');
    expect(result.split('\n').length).toBeGreaterThan(1); // Multiple lines
    expect(result.startsWith('=')).toBe(true);
  });

  test('should handle formula without leading =', () => {
    const formula = 'IF(A1>0,"Yes","No")';
    const result = beautifier.beautify(formula);

    expect(result).toContain('IF');
    expect(result.startsWith('=')).toBe(false); // Should not add = if it wasn't there
  });

  test('should handle empty formula', () => {
    const formula = '';
    const result = beautifier.beautify(formula);

    expect(result).toBe('');
  });

  test('should beautify SUMIFS formula', () => {
    const formula = '=SUMIFS(C1:C1000,A1:A1000,">0",B1:B1000,"Yes")';
    const result = beautifier.beautify(formula);

    expect(result).toContain('SUMIFS');
    expect(result).toContain('\n'); // Should be multi-line
  });

  test('should beautify AND formula', () => {
    const formula = '=AND(A1>0,B1<10,C1="Yes")';
    const result = beautifier.beautify(formula);

    expect(result).toContain('AND');
    expect(result).toContain('\n'); // Should be multi-line
  });

  test('should beautify VLOOKUP formula', () => {
    const formula = '=VLOOKUP(A2,$D$1:$F$100,2,FALSE)';
    const result = beautifier.beautify(formula);

    expect(result).toContain('VLOOKUP');
    expect(result).toContain('\n'); // Should be multi-line
  });

  test('should handle quoted strings with commas', () => {
    const formula = '=IF(A1>0,"Hello, World","Goodbye")';
    const result = beautifier.beautify(formula);

    expect(result).toContain('Hello, World'); // Comma inside string should be preserved
    expect(result).toContain('Goodbye');
  });

  test('should preserve simple non-multiline functions on single line', () => {
    const formula = '=SUM(A1:A10)';
    const result = beautifier.beautify(formula);

    expect(result).toBe('=SUM(A1:A10)'); // Should stay on one line
  });

  test('should use custom indent size', () => {
    const customBeautifier = new FormulaBeautifier(2); // 2 spaces instead of 4
    const formula = '=IF(A1>0,"Yes","No")';
    const result = customBeautifier.beautify(formula);

    expect(result).toContain('  '); // Should have 2-space indentation
  });

  test('convenience function beautifyFormula should work', () => {
    const formula = '=IF(A1>0,"Yes","No")';
    const result = beautifyFormula(formula);

    expect(result).toContain('IF');
    expect(result).toContain('\n');
  });

  test('should handle malformed formula gracefully', () => {
    const formula = '=IF(A1>0,"Yes"'; // Missing closing paren
    const result = beautifier.beautify(formula);

    // Should return original formula without crashing
    expect(result).toBe(formula);
  });

  test('should handle complex nested formula', () => {
    const formula = '=IF(AND(A1>0,B1<10),IF(C1="Yes","OK","NO"),"FAIL")';
    const result = beautifier.beautify(formula);

    expect(result).toContain('IF');
    expect(result).toContain('AND');
    expect(result.split('\n').length).toBeGreaterThan(1);
  });
});
