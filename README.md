# Professional Portfolio & CV Website

A modern, professional portfolio website built with React, TypeScript, and Tailwind CSS.

## Features

- 🎨 Clean, minimalist design with smooth animations
- 📱 Fully responsive layout - looks great on all devices
- ⚡ Fast and performant
- 🧩 Modular component structure
- 🌟 Subtle animations and interactions
- 🔍 SEO-friendly
- 🚀 Easy to deploy to GitHub Pages

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or later)
- npm or yarn

### Installation

1. Clone the repository:
```sh
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

2. Install dependencies:
```sh
npm install
# or
yarn
```

3. Start the development server:
```sh
npm run dev
# or
yarn dev
```

4. Open your browser and visit `http://localhost:8080` to see the website.

## Customization

### Personal Information

Update your personal information in the corresponding component files:

- `src/components/Hero.tsx` - Update your name and tagline
- `src/components/About.tsx` - Update your bio, skills, and metrics
- `src/components/Experience.tsx` - Update your work experience
- `src/components/Projects.tsx` - Update your project list
- `src/components/Contact.tsx` - Update your contact information
- `src/components/Footer.tsx` - Update copyright information and social links

### Photos and Images

Replace the placeholder images with your own:

1. Add your profile picture to the `public` directory
2. Update the image sources in the appropriate components

### Colors and Styling

The main styling is controlled through Tailwind CSS. You can customize the colors and other design elements in:

- `tailwind.config.ts` - Update the theme colors
- `src/index.css` - Update global styles and custom CSS classes

## Deployment to GitHub Pages

1. Create a GitHub repository for your portfolio.

2. Install the `gh-pages` package:
```sh
npm install --save-dev gh-pages
# or
yarn add --dev gh-pages
```

3. Add the following to your `package.json`:
```json
"homepage": "https://yourusername.github.io/repository-name",
"scripts": {
  // ...existing scripts
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

4. Deploy your website:
```sh
npm run deploy
# or
yarn deploy
```

5. Configure GitHub Pages:
   - Go to your GitHub repository settings
   - Navigate to the "Pages" section
   - Select the `gh-pages` branch as the source
   - Save your changes

Your portfolio website should now be live at: `https://yourusername.github.io/repository-name`

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
