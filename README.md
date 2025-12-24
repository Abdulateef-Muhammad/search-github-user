# GitHub Repository Search

A modern, responsive web application built with React, TypeScript, and Vite that allows users to search for GitHub repositories and view detailed information.

## Features

- **Repository Search:** Search for GitHub repositories by username.
- **Filtering & Sorting:** Filter repositories by language and sort by stars, forks, or update date.
- **Responsive Design:** A clean, mobile-friendly interface built with Tailwind CSS.
- **Dark/Light Mode:** Seamless theme switching support.
- **User Profiles:** View GitHub user profile information including bio, location, and social links.

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Data Fetching:** SWR
- **Testing:** Vitest + React Testing Library

## Data Fetching with SWR

This project uses **SWR** (stale-while-revalidate), a React Hooks library for data fetching. The name is derived from the HTTP cache invalidation strategy popularized by HTTP RFC 5861.

### Why SWR?

SWR provides a seamless data fetching experience with built-in features like:

- **Fast & Lightweight:** Minimal bundle size.
- **Real-time Experience:** Automatic revalidation on focus, network recovery, and interval.
- **TypeScript Support:** First-class TypeScript support.

### Caching Strategy

By default, SWR uses the **stale-while-revalidate** caching strategy. Here’s how it works:

1.  **Stale:** When a request is made, SWR immediately returns the cached data (if available) so the UI renders instantly.
2.  **Revalidate:** At the same time, SWR sends a fetch request to the API to check for the latest data.
3.  **Update:** Once the new data arrives, SWR updates the UI with the fresh data and updates the cache.

This strategy ensures the user sees content immediately (even if it's slightly old) while the app updates it in the background, providing a snappy, "app-like" feel. Other default caching behaviors include:
- **Deduplication:** Multiple components requesting the same data will only trigger a single network request.
- **Cache Persistence:** Data remains in the cache and is shared across components.
