# Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────┐
│            Excel Desktop                 │
│  ┌───────────────────────────────────┐  │
│  │     Office Add-in (Office.js)     │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │   React UI (Task Pane)      │  │  │
│  │  │  - FormulaOptimizer         │  │  │
│  │  │  - Settings                 │  │  │
│  │  │  - History                  │  │  │
│  │  └─────────────────────────────┘  │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │   Commands (Ribbon)         │  │  │
│  │  └─────────────────────────────┘  │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
                  │
                  │ HTTPS
                  ▼
┌─────────────────────────────────────────┐
│         Backend API (Express.js)        │
│  ┌───────────────────────────────────┐  │
│  │         API Gateway               │  │
│  │  - Rate Limiting                  │  │
│  │  - Authentication                 │  │
│  │  - CORS                           │  │
│  └───────────────────────────────────┘  │
│  ┌───────────────────────────────────┐  │
│  │    Optimization Service           │  │
│  │  - Formula Parser                 │  │
│  │  - AI Provider Factory            │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
                  │
                  │ API Calls
                  ▼
┌─────────────────────────────────────────┐
│          AI Providers                   │
│  ┌──────────┬──────────┬────────────┐  │
│  │  OpenAI  │ Anthropic│   Google   │  │
│  │  GPT-4   │  Claude  │   Gemini   │  │
│  └──────────┴──────────┴────────────┘  │
│  ┌──────────────────────────────────┐  │
│  │     Ollama (Local)               │  │
│  └──────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

## Component Details

### Frontend (Office Add-in)

**Technology Stack:**
- Office.js for Excel integration
- React 18 for UI components
- TypeScript for type safety
- Fluent UI for Microsoft design system
- Webpack for bundling

**Key Components:**

1. **Task Pane**
   - Main UI shown in Excel sidebar
   - Three tabs: Optimizer, History, Settings
   - Manages state and user interactions

2. **Formula Optimizer**
   - Captures selected cell formula
   - Sends to backend API
   - Displays optimized result
   - Applies changes to Excel

3. **History**
   - Stores last 50 optimizations in localStorage
   - Allows reapplication of previous optimizations

4. **Settings**
   - Configure AI provider
   - Manage API keys
   - Set preferences (auto-replace, etc.)

### Backend API

**Technology Stack:**
- Node.js with Express
- TypeScript
- Winston for logging
- Helmet for security
- Rate limiting

**Key Services:**

1. **AI Provider Factory**
   - Creates appropriate AI provider instance
   - Handles API key management
   - Abstracts provider differences

2. **Formula Parser**
   - Analyzes formula structure
   - Extracts functions and references
   - Calculates complexity score

3. **AI Providers**
   - Base class defines interface
   - Each provider implements optimization
   - Consistent response format

### Data Flow

1. User selects cell with formula in Excel
2. User presses Ctrl+Shift+O or clicks button
3. Frontend extracts formula via Office.js
4. Frontend sends formula + provider + API key to backend
5. Backend parses formula structure
6. Backend calls selected AI provider
7. AI provider analyzes and optimizes
8. Backend returns result to frontend
9. Frontend displays result in task pane
10. User reviews and applies (or cancels)
11. If applied, frontend updates Excel cell
12. Optimization saved to local history

## Security Architecture

### Authentication & Authorization
- API keys stored client-side only
- Bearer token authentication for API
- Rate limiting per IP address

### Data Privacy
- No formula data persisted on server
- All transmission over HTTPS
- No user tracking or analytics

### Input Validation
- Formula format validation
- Provider whitelist
- API key format checking
- SQL injection prevention (though no DB)

## Scalability Considerations

### Current Limitations
- Rate limiting: 1000 requests/day
- Synchronous processing
- In-memory rate limiting (not distributed)
- No caching layer

### Future Improvements
- Redis for distributed rate limiting
- Queue-based processing (Bull, RabbitMQ)
- Response caching for common formulas
- Horizontal scaling with load balancer
- Database for user management

## Error Handling

### Frontend
- Try-catch blocks around API calls
- User-friendly error messages
- Fallback UI states
- Retry mechanisms

### Backend
- Global error handler middleware
- Structured logging
- Graceful degradation
- Circuit breaker pattern (future)

## Testing Strategy

### Unit Tests
- React components (Jest + React Testing Library)
- Backend services (Jest)
- AI provider mocks

### Integration Tests
- API endpoint testing
- Office.js integration
- End-to-end workflows

### Performance Tests
- API response time
- Formula parsing speed
- UI rendering performance

## Deployment Architecture

### Development
```
localhost:3000  → Webpack Dev Server (Frontend)
localhost:5000  → Express Server (Backend)
```

### Production
```
CDN/GitHub Pages  → Static Frontend Files
Render.com        → Backend API
```

## Future Architecture Enhancements

1. **Microservices**
   - Separate services for each AI provider
   - Independent scaling
   - Better fault isolation

2. **Caching Layer**
   - Redis for formula optimization cache
   - Reduce API calls to AI providers
   - Faster response times

3. **Analytics**
   - Usage metrics
   - Error tracking (Sentry)
   - Performance monitoring

4. **Database**
   - User accounts and preferences
   - Shared optimization library
   - Usage quotas and billing
