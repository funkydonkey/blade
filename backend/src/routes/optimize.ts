import express, { Request, Response } from 'express';
import { AIProviderFactory } from '../services/aiProviderFactory';
import { FormulaParser } from '../services/formulaParser';
import logger from '../utils/logger';

const router = express.Router();

interface OptimizeRequest {
  formula: string;
  provider: 'openai' | 'anthropic' | 'google' | 'ollama';
  apiKey?: string;
  context?: string;
}

router.post('/', async (req: Request, res: Response) => {
  try {
    const { formula, provider, apiKey, context }: OptimizeRequest = req.body;

    // Validation
    if (!formula || typeof formula !== 'string') {
      return res.status(400).json({ error: 'Formula is required' });
    }

    if (!formula.startsWith('=')) {
      return res.status(400).json({ error: 'Invalid formula format' });
    }

    if (!provider) {
      return res.status(400).json({ error: 'AI provider is required' });
    }

    // Parse formula
    const parser = new FormulaParser();
    const parsedFormula = parser.parse(formula);

    // Get AI provider
    const aiProvider = AIProviderFactory.create(provider, apiKey);

    // Optimize formula
    const result = await aiProvider.optimizeFormula(formula, {
      parsedStructure: parsedFormula,
      context
    });

    logger.info(`Formula optimized successfully using ${provider}`);

    res.json({
      optimized: result.optimized,
      explanation: result.explanation,
      improvementPercentage: result.improvementPercentage
    });
  } catch (error: any) {
    logger.error('Optimization error:', error);
    res.status(500).json({
      error: error.message || 'Failed to optimize formula'
    });
  }
});

export default router;
