# Monorepo Setup and Deployment

## Overview

This document provides a comprehensive guide to the Skillup monorepo architecture and deployment setup. The project uses Turborepo to manage the monorepo structure and Vercel for seamless deployment.

## Monorepo Architecture

### Structure

The Skillup platform uses a Turborepo-powered monorepo with the following structure:

```
skillup/
├── apps/                  # Application packages
│   ├── api/               # NestJS backend API
│   ├── web/               # Next.js frontend application
│   └── docs/              # Documentation site
├── packages/              # Shared libraries
│   ├── eslint-config/     # Shared ESLint configuration
│   ├── tailwind-config/   # Shared Tailwind CSS configuration
│   ├── typescript-config/ # Shared TypeScript configuration
│   └── ui/                # Shared UI components
├── turbo.json             # Turborepo configuration
└── package.json           # Root package configuration
```

### Benefits of Monorepo

- **Shared Code**: Easy sharing of code between applications
- **Consistent Tooling**: Single configuration for linting, formatting, etc.
- **Atomic Changes**: Make related changes across multiple packages
- **Simplified Dependencies**: Manage dependencies at the root level
- **Efficient CI/CD**: Run only affected workspaces in CI

## Turborepo Configuration

### Setup

The monorepo is configured via `turbo.json` in the root directory:

```json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": [".env"],
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**", "public/dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {
      "outputs": []
    },
    "test": {
      "dependsOn": ["build"],
      "outputs": [],
      "inputs": ["src/**/*.tsx", "src/**/*.ts", "test/**/*.ts", "test/**/*.tsx"]
    }
  }
}
```

### Key Features

- **Remote Caching**: Turborepo provides remote caching to speed up builds
- **Task Orchestration**: Define dependencies between tasks across packages
- **Incremental Builds**: Only rebuild what's changed

## Vercel Deployment

### Quick Setup

Deploying the Skillup monorepo to Vercel is simplified with these steps:

1. Connect your GitHub repository to Vercel
2. Configure the monorepo settings:
   ```
   Root directory: ./
   Framework preset:
     - For web: Next.js
     - For api: Node.js (NestJS)
   ```
3. Set up environment variables in the Vercel dashboard
4. Configure the build command: `pnpm turbo build`

### Deployment Shortcuts

#### Project Linking

Link your local project to Vercel for direct deployments:

```bash
# Install Vercel CLI
pnpm install -g vercel

# Login to Vercel
vercel login

# Link project
vercel link

# Deploy
vercel deploy
```

#### Advanced Configuration

Create a `vercel.json` file in each app directory for custom settings:

```json
{
  "buildCommand": "cd ../.. && pnpm turbo build --filter=web",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "installCommand": "cd ../.. && pnpm install",
  "ignoreCommand": "if [ \"$VERCEL_ENV\" != \"production\" ]; then exit 0; fi"
}
```

### Environment Variables

For proper deployment, set these environment variables in Vercel:

- `TURBO_TOKEN`: Turborepo token for remote caching
- `TURBO_TEAM`: Your Vercel team slug
- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: Secret for JWT token generation
- `NODE_ENV`: Environment (development, production)

## Deployment Badges

Add these badges to your README.md to show deployment status:

```markdown
[![Vercel Production Deployment](https://img.shields.io/badge/vercel-production-brightgreen?logo=vercel)](https://skillup.masalief.my.id/)
[![Vercel Preview Deployment](https://img.shields.io/badge/vercel-preview-orange?logo=vercel)](https://preview.skillup.masalief.my.id/)
[![Turborepo](https://img.shields.io/badge/built%20with-turborepo-cc00ff.svg?style=flat&logo=turborepo)](https://turborepo.org/)
```

## Automatic Deployments

Vercel automatically deploys:
- Production branch (main/master) to production environment
- Feature branches to preview environments

## Monitoring Deployments

Monitor deployments through:
- Vercel Dashboard
- GitHub Commit Status Checks
- Deployment Notifications (Slack, Discord, Email)

## Troubleshooting

Common deployment issues and solutions:

1. **Build Failures**
   - Check build logs in Vercel dashboard
   - Ensure all dependencies are properly installed
   - Verify environment variables are set correctly

2. **Environment Variables**
   - Make sure all required variables are added
   - Check for typos in variable names
   - Use the Preview feature to test environment configuration

3. **Performance Issues**
   - Enable Vercel Analytics to monitor performance
   - Implement proper caching strategies
   - Optimize asset loading and bundle sizes

## Best Practices

- Use atomic commits and feature branches
- Set up preview environments for PR validation
- Implement comprehensive tests before deployment
- Utilize staged rollouts for critical changes
- Monitor error rates and performance after deployment