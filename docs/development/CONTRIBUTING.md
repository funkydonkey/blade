# Contributing to Excel AI Formula Optimizer

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/blade.git`
3. Create a feature branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Test thoroughly
6. Commit with clear messages
7. Push to your fork
8. Open a Pull Request

## Development Setup

See README.md for detailed setup instructions.

## Code Style

- Use TypeScript for all new code
- Follow existing code formatting
- Run ESLint before committing: `npm run lint`
- Use meaningful variable and function names
- Add comments for complex logic

## Commit Messages

Follow conventional commits format:

```
type(scope): brief description

Detailed description if needed
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding/updating tests
- `chore`: Maintenance tasks

Examples:
```
feat(optimizer): add batch optimization support
fix(api): handle timeout errors gracefully
docs(readme): update installation instructions
```

## Pull Request Process

1. Update documentation if needed
2. Add tests for new features
3. Ensure all tests pass
4. Update CHANGELOG.md
5. Request review from maintainers

## Testing

- Write unit tests for new functions
- Test with multiple Excel versions if possible
- Test with all supported AI providers
- Include edge cases and error scenarios

## Bug Reports

Include:
- Excel version and OS
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Error messages from console/logs

## Feature Requests

- Describe the problem it solves
- Provide use cases
- Suggest implementation approach
- Consider backward compatibility

## Code of Conduct

- Be respectful and inclusive
- Accept constructive criticism
- Focus on what's best for the project
- Help others learn and grow

## Questions?

Open an issue with the "question" label or join our discussions.
