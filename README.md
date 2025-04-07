# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/3e011e12-3bcf-448e-85b4-97a1132765f8

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/3e011e12-3bcf-448e-85b4-97a1132765f8) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/3e011e12-3bcf-448e-85b4-97a1132765f8) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes it is!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

# Whole Slide Image (WSI) Viewer

An interactive viewer for examining medical slide images with annotations and findings display.

## Features

- Interactive slide viewing with zoom and pan controls
- Thumbnail "hub view" with viewport indicator
- Findings panel showing cell counts and percentages
- Bounding box visualizations around detected cells

## Usage Instructions

- **Pan**: Click and drag on the main image
- **Zoom**: Use the mouse wheel or the +/- buttons
- The hub view in the top right shows your current viewport location
- Cell detections are shown as blue bounding boxes
- The left panel shows counts and statistics for detected cells

## Data Structure

The application expects detection results in the following format:

```json
{
  "detections": [
    {
      "x": 100,
      "y": 100,
      "width": 30,
      "height": 30,
      "class": "Angled Cell",
      "confidence": 0.95
    }
  ],
  "summary": {
    "rbc": {
      "Angled Cells": { "count": 222, "percentage": 67 },
      // Other cell types...
    },
    "wbc": {
      // WBC cell types...
    },
    "platelets": {
      "Count": 222,
      "Percentage": 222
    }
  }
}
```

## Development

This project was built using React, TypeScript, and Tailwind CSS. To run it locally:

```
npm install
npm run dev
```
