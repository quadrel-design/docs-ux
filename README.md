# Quadrel Docs-UX

This repository contains the documentation and UX guidelines for Quadrel, built with Nextra.

## Project Structure

- `src/app/`: Contains the main Next.js application layout and global CSS files.
  - `layout.jsx`: Root layout for the Next.js application, including global component imports and Nextra Layout setup.
  - `globals.css`: Contains global CSS rules, primarily for full-width layout overrides.
  - `variables.css`: Defines CSS variables for consistent styling across the project.
  - `components.css`: Contains custom CSS styles for Quadrel-specific components.
  - `nextra-overrides.css`: Contains CSS rules to override default Nextra theme styles.
  - `demo-header.css`: Contains CSS rules specific to the custom demo header.
- `src/components/`: Houses custom React components used throughout the documentation.
  - `QuadrelHeader.jsx`: The custom header component for demo pages.
  - `QuadrelHeaderConfig.jsx`: A client component to manage the visibility of `QuadrelHeader`.
  - `QuadrelLightbox.jsx`: A custom lightbox component for images.
  - `QuadrelMasonryGallery.jsx`: A responsive image gallery component.
  - `QuadrelCard.jsx`, `QuadrelCardGrid.jsx`: Custom card components for displaying content in a grid.
  - `QuadrelMermaid.jsx`: Custom Mermaid component for diagram styling.
- `src/content/`: Stores the MDX documentation content, organized by categories.
  - `floorplans/`: Documentation related to floorplans.
  - `components/`: Documentation for custom components.
  - `_meta.js`: Files within content directories to define sidebar navigation and page metadata.
- `mdx-components.js`: Custom MDX components registration.
- `next.config.mjs`: Next.js configuration file.

## Setup

To set up the project locally, you need [Node.js](https://nodejs.org/en/download/) (version 20 or higher) installed.

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/quadrel-design/docs-ux.git
    cd docs-ux
    ```

2.  **Install dependencies:**

    This project uses Next.js, Nextra, and other dependencies. They will be installed automatically with the following command:

    ```bash
    npm install
    ```

3.  **Run the development server:**

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) (or the port indicated in your terminal) in your browser to see the documentation.

## Build

To build the project for production:

```bash
npm run build
```

This command will create an optimized production build in the `.next` directory and generate static pages.

## Deployment to GitHub Pages

This project includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) configured for deployment to GitHub Pages. The `next.config.mjs` also includes `output: 'export'`, `basePath`, and `assetPrefix` to support static export and deployment to a subpath.

### Environment Variables

- `BASE_PATH`: Set this environment variable in your deployment pipeline to the repository name (e.g., `/docs-ux`) if deploying to `https://<username>.github.io/<repository-name>/`. If deploying to a custom domain at the root, leave it empty.

**Note**: Ensure your GitHub Pages settings in your repository are configured to deploy from the `gh-pages` branch or the `docs` folder, depending on your `actions/deploy-pages` setup.
