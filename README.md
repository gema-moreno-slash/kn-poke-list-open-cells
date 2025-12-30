# Poke API Open Cells

A web application built with Open Cells and Lit that displays Pokémon information using the PokeAPI.

## Description

This project is a single-page application (SPA) that allows users to browse a list of Pokémon and view detailed information about each one. It demonstrates the use of modern web technologies including Lit for web components, Open Cells for routing and state management, and Vite for development tooling.

## Features

- Browse a paginated list of Pokémon
- View detailed information for each Pokémon including stats, types, and abilities
- Responsive design using Bulma CSS framework
- Fast development with Vite and hot module replacement
- TypeScript support for better code maintainability

## Tech Stack

- **Frontend Framework**: Lit
- **Routing & State Management**: Open Cells
- **Build Tool**: Vite
- **Language**: TypeScript/JavaScript
- **Styling**: Bulma CSS
- **API**: PokeAPI (https://pokeapi.co/)
- **HTTP Client**: Axios

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd poke-api-open-cells
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

- Navigate to the home page to see a list of Pokémon
- Click on a Pokémon to view its details
- Use the pagination controls to browse through different Pokémon

## Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally

## Project Structure

```
src/
├── components/          # Reusable UI components
├── css/                # Stylesheets
├── pages/              # Page components
│   ├── detail/         # Pokémon detail page
│   ├── home/           # Home/test page
│   ├── list/           # Pokémon list page
│   └── second/         # Second/test page
├── router/             # Routing configuration
└── service/            # API service layer
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the Apache-2.0 License.