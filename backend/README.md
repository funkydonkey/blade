# Excel AI Formula Optimizer - Backend API

Express.js backend service for AI-powered Excel formula optimization.

## Features

- Multiple AI provider support (OpenAI, Anthropic, Google, Ollama)
- RESTful API design
- Rate limiting
- Error handling and logging
- CORS enabled
- TypeScript

## API Endpoints

### POST /api/optimize

Optimize an Excel formula using AI.

**Headers**
```
Content-Type: application/json
Authorization: Bearer <api_key>
```

**Request**
```json
{
  "formula": "=SUM(A1:A10)/COUNT(A1:A10)",
  "provider": "openai",
  "apiKey": "sk-...",
  "context": "Sales data for Q1 2025"
}
```

**Response**
```json
{
  "optimized": "=AVERAGE(A1:A10)",
  "explanation": "Combined SUM and COUNT into a single AVERAGE function",
  "improvementPercentage": 60
}
```

### GET /health

Health check endpoint.

**Response**
```json
{
  "status": "ok",
  "timestamp": "2025-11-15T12:00:00.000Z"
}
```

## Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=5000
NODE_ENV=development

OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GOOGLE_API_KEY=...
OLLAMA_BASE_URL=http://localhost:11434

RATE_LIMIT_MAX_REQUESTS=1000
RATE_LIMIT_WINDOW_MS=86400000

CORS_ORIGIN=https://localhost:3000
```

## Development

```bash
npm install
npm run dev
```

## Production

```bash
npm run build
npm start
```

## Testing

```bash
npm test
```

## Project Structure

```
backend/
├── src/
│   ├── server.ts              # Express server
│   ├── routes/
│   │   └── optimize.ts        # API routes
│   ├── services/
│   │   ├── aiProviderFactory.ts
│   │   ├── formulaParser.ts
│   │   └── providers/         # AI provider implementations
│   ├── middleware/
│   │   ├── errorHandler.ts
│   │   └── rateLimiter.ts
│   └── utils/
│       └── logger.ts
├── dist/                      # Compiled output
└── logs/                      # Application logs
```

## Logging

Logs are written to:
- `logs/error.log` - Error level logs
- `logs/combined.log` - All logs
- Console (development only)

## Rate Limiting

Default: 1000 requests per 24 hours per IP address.

Configure via environment variables:
- `RATE_LIMIT_MAX_REQUESTS`
- `RATE_LIMIT_WINDOW_MS`

## Security

- Helmet.js for security headers
- CORS configured for specific origins
- Input validation on all endpoints
- API keys not logged
- Rate limiting to prevent abuse

## Adding New AI Providers

1. Create new provider in `src/services/providers/`
2. Extend `AIProvider` base class
3. Implement `optimizeFormula()` method
4. Add to `AIProviderFactory`
5. Update environment variables

Example:

```typescript
import { AIProvider, OptimizationResult } from './base';

export class NewProvider extends AIProvider {
  async optimizeFormula(formula: string): Promise<OptimizationResult> {
    // Implementation
  }
}
```
