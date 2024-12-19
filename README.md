# Screen Share App

Welcome to the Screen Share App repository! This guide will help you set up the project, run it, and package it for various platforms.

## Table of Contents

- Prerequisites
- Installation
- Running the Application
- Build & Distribution
- License

## 📌 Prerequisites

Before setting up the project, ensure you have the following tools installed on your machine:

- [Node.js (v16 or higher)](https://nodejs.org/)
- [npm (comes with Node.js) or Yarn]
- [Git ](https://git-scm.com/)


To verify the installation, run the following commands:

```bash
node -v
npm -v
git --version
```

Ensure you see version numbers for each.

## 💿 Installation

To set up the project, follow these steps:

- **Clone the Repository**: 

```bash
git clone https://github.com/MrChaylak/screen-share-app.git
cd screen-share-app
```

- **Install Dependencies**: 

```bash
npm install
```

This command installs all required dependencies listed in package.json.

## 💡 Running the Application

To run the application in development mode, use the following command:

```bash
npm run dev
```

This will run both the Vue app and Electron app in parallel. The Vue app will be served on localhost:3000, and Electron will display it in a native desktop window.

If you want to run only the Electron app, you can use:

```bash
npm run electron:start
```

Note: This command starts the Electron app without the development server. It's useful for testing standalone Electron builds.

## 🔨 Build & Distribution

To build the project for distribution, you can create platform-specific packages for macOS, Windows, or Linux.

- **Build for macOS**:

```bash
npm run dist:mac
```

- **Build for Windows**:

```bash
npm run dist:win
```

- **Build for Linux**:

```bash
npm run dist:linux
```

## 📑 License
[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2016-present Vuetify, LLC
