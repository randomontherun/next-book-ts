# NextBook

NextBook is a web application for searching, browsing, and managing book lists. It integrates with the Google Books API for book data and uses the OpenAI API for generating summaries. The application is built with modern frontend tools and features a clean, responsive design.

## Features
- **Dynamic Components**: Leveraged [shadcn/ui](https://ui.shadcn.dev/) for building reusable components like buttons, carousels, modals, and drawers.
- **API Integration**: 
  - Google Books API for searching and retrieving book details.
  - OpenAI API for generating book summaries on demand.
- **Local State Management**: Uses React's `useState` and local memory to store and manage reading lists efficiently.

## How It Works
1. **Search Books**: Enter a query in the search bar to fetch book results from the Google Books API.
2. **Manage Lists**: Add books to your reading list and view them in a custom drawer component.
3. **View Summaries**: Click on a book to fetch and display a summary powered by the OpenAI API.

## Technologies Used
- **Frontend**: React, TypeScript, Vite
- **UI Components**: shadcn/ui
- **APIs**: Google Books, OpenAI

Explore your next favorite book with NextBook!
