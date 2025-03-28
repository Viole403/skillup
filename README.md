<br/>
<div align="center">
<a href="https://github.com/Viole403/skillup">
<img src="./apps/docs/images/logo.png" alt="Logo" width="80" height="80">
</a>
<h3 align="center">Skillup</h3>
<p align="center">
A full-stack web application designed to help users enhance their skills through various interactive modules.
<br/>
<br/>
<a href="https://www.skillup.masalief.my.id/">View Demo</a> •
<a href="https://github.com/Viole403/skillup/issues/new?labels=bug&amp;template=bug_report.md">Report Bug</a> •
<a href="https://github.com/Viole403/skillup/issues/new?labels=enhancement&amp;template=feature_request.md">Request Feature</a>
</p>
</div>

[![Turborepo](https://img.shields.io/badge/built%20with-turborepo-cc00ff.svg?style=flat&logo=turborepo)](https://turborepo.org/) [![Vercel Production Deployment](https://img.shields.io/badge/vercel-production-brightgreen?logo=vercel)](https://skillup.masalief.my.id/) [![Vercel Preview Deployment](https://img.shields.io/badge/vercel-preview-orange?logo=vercel)](https://preview.skillup.masalief.my.id/)
![Contributors](https://img.shields.io/github/contributors/Viole403/skillup?color=dark-green) ![Issues](https://img.shields.io/github/issues/Viole403/skillup) ![License](https://img.shields.io/github/license/Viole403/skillup) ![Build Status](https://img.shields.io/badge/build-passing-brightgreen) ![Version](https://img.shields.io/badge/version-0.0.1-blue)

## 📋 Table of Contents
- [✨ About The Project](#-about-the-project)
- [🚀 Features](#-features)
- [🏗️ Project Structure](#-project-structure)
- [🛠️ Built With](#-built-with)
- [🧰 Getting Started](#-getting-started)
  - [📋 Prerequisites](#-prerequisites)
  - [📥 Installation](#-installation)
  - [🔐 Environment Variables](#-environment-variables)
- [🔄 Usage](#-usage)
- [☁️ Deployment](#-deployment)
- [🗺️ Roadmap](#-roadmap)
- [🤝 Contributing](#-contributing)
- [📝 License](#-license)
- [📊 Project Status](#-project-status)
- [📜 Changelog](#-changelog)
- [🔒 Security](#-security)
- [❓ FAQ](#-faq)
- [👏 Acknowledgements](#-acknowledgements)
- [📞 Contact](#-contact)

## ✨ About The Project

Skillup is a comprehensive learning platform designed to help users enhance their skills through interactive courses and modules. The application offers a user-friendly interface for accessing educational content, tracking progress, and earning certifications.

![Project Screenshot](images/screenshot.png)

## 🚀 Features

### Core Features
- **Interactive Learning Modules**: Engage with hands-on learning experiences
- **Progress Tracking**: Monitor your advancement through courses with detailed statistics
- **User Authentication**: Secure login and registration with role-based access control
- **Admin Dashboard**: Comprehensive tool for managing users, courses, and content
- **Responsive Design**: Seamless experience across desktop, tablet, and mobile devices

### Advanced Features
- **Course Enrollment**: Register for specific courses with enrollment management
- **Achievement System**: Earn badges and certificates upon completion
- **Discussion Forums**: Engage with other learners in course-specific discussions
- **Content Management**: Create, edit, and publish courses with rich media support
- **Analytics Dashboard**: Visualize learning patterns and performance metrics

## 🏗️ Project Structure

The project follows a monorepo structure using Turborepo:

```
skillup/
├── apps/                  # Application packages
│   ├── api/               # Backend API (NestJS)
│   ├── web/               # Frontend Application (Next.js)
│   └── docs/              # Documentation site
├── packages/              # Shared libraries
│   ├── eslint-config/     # ESLint configuration
│   ├── tailwind-config/   # Tailwind CSS configuration
│   ├── typescript-config/ # TypeScript configuration
│   └── ui/                # Shared UI components
├── docker-compose.yml     # Docker configuration
└── package.json           # Root package configuration
```

## 🛠️ Built With

### Backend
- [NestJS](https://nestjs.com/) - Progressive Node.js framework
- [PostgreSQL](https://www.postgresql.org/) - Relational database
- [Prisma](https://www.prisma.io/) - ORM for database access
- [Passport](https://www.passportjs.org/) - Authentication middleware

### Frontend
- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Daisy UI](https://daisyui.com/) - Tailwind CSS component library
- [Shadcn](https://shadcn.com/) - Library for reusable UI components

## 🧰 Getting Started

### 📋 Prerequisites

- Node.js (v16 or higher)
- PNPM package manager
- PostgreSQL
- Git

### 📥 Installation

#### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/Viole403/skillup.git
   cd skillup
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up the backend:
   ```bash
   cd apps/api
   pnpm db:migrate
   pnpm start:dev
   ```

#### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd apps/web
   ```

2. Start the development server:
   ```bash
   pnpm dev
   ```


### 🔐 Environment Variables

This project uses a global environment variable setup with Turborepo to share environment variables across all applications in the monorepo.

#### Setup

1. Copy the example environment file to create your own:
   ```bash
   cp .env.example .env
   ```

2. Edit the `.env` file with your specific configuration values.

#### How It Works

- The root `.env` file contains all environment variables for all applications
- Turborepo's `globalEnv` configuration in `turbo.json` makes these variables available to all workspaces
- `dotenv-cli` is used to load the environment variables during development and build

#### Environment Files

- `.env` - Contains actual environment variables (not committed to Git)
- `.env.example` - Example file with placeholder values (committed to Git)
- `.env.test` - Used for testing environments (optional)
- `.env.production` - Used for production environments (optional)

#### Running Applications

Use the following commands to run applications with the correct environment variables:

```bash
# Run all applications
pnpm dev

# Run specific applications
pnpm dev:api
pnpm dev:web
pnpm dev:docs
```

## 🔄 Usage

Once the application is running:

1. Access the frontend at [http://localhost:3000](http://localhost:3000)
2. Register a new account or log in with demo credentials:
   - Email: `demo@skillup.com`
   - Password: `demo123`
3. Explore available courses and start learning!

### API Documentation

API documentation is available at [http://localhost:3000/api/docs](http://localhost:3000/api/docs) when running locally.

## ☁️ Deployment

### Production Servers
- **Backend**: [https://api-skillup.masalief.my.id](https://api-skillup.masalief.my.id)
- **Frontend**: [https://skillup.masalief.my.id](https://skillup.masalief.my.id)

### Deployment Options

#### Docker Deployment
```bash
docker-compose up -d
```

#### Manual Deployment
1. Build the applications:
   ```bash
   pnpm build
   ```

2. Start the production servers:
   ```bash
   pnpm start
   ```

#### Serverless Deployment
The application supports deployment to Vercel, Netlify, and other serverless platforms. See the deployment documentation for specific instructions.

## 🗺️ Roadmap

The Skillup project follows a structured development roadmap. We track completed features, current work, and future enhancements.

For the complete development roadmap, please see [ROADMAP.md](ROADMAP.md).

Some key upcoming features include:
- User authentication and authorization
- Course creation and management
- Progress tracking system
- Responsive design optimization

See the [open issues](https://github.com/Viole403/skillup/issues) for a full list of proposed features and known issues.

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Pull Requests

To submit a pull request:
1. Ensure your code follows the project's coding standards
2. Include tests for new functionality
3. Update documentation as needed
4. Submit the PR with a comprehensive description of changes

### Reporting Issues

If you encounter a bug or have a feature request:
1. Use the issue templates provided
2. Include detailed steps to reproduce any bugs
3. Specify your environment (OS, browser, etc.)
4. Add relevant screenshots if applicable

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📊 Project Status

The project is currently in **active development**. We're working on adding new features and improvements regularly.

## 📜 Changelog

For a detailed history of changes, please see the [CHANGELOG.md](CHANGELOG.md) file.

## 🔒 Security

For security concerns, please report vulnerabilities privately via email to security@masalief.my.id rather than creating public issues. See [SECURITY.md](SECURITY.md) for our security policy.

## ❓ FAQ

For frequently asked questions, please see the [FAQ.md](FAQ.md) file for more information.

## 👏 Acknowledgements

* [Next.js](https://nextjs.org/)
* [NestJS](https://nestjs.com/)
* [Tailwind CSS](https://tailwindcss.com/)
* [Daisy UI](https://daisyui.com/)
* [Shadcn](https://ui.shadcn.com/)
* [Prisma](https://www.prisma.io/)
* [PostgreSQL](https://www.postgresql.org/)
* [Vercel](https://vercel.com/)
* [GitHub](https://github.com/)
* [Figma](https://www.figma.com/)
* All contributors who have helped shape this project

## 📞 Contact

Masalief Maulana - [https://masalief.my.id](https://masalief.my.id) - contact@masalief.my.id

Project Link: [https://github.com/Viole403/skillup](https://github.com/Viole403/skillup)