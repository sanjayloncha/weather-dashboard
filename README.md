# Weather Analytics Dashboard

A modern, responsive weather dashboard built with React that allows users to track weather conditions across multiple cities with detailed forecasts and interactive charts.

## Features

- **Multi-city weather tracking** with search functionality
- **Favorite cities** with localStorage persistence
- **Detailed weather view** including current conditions, hourly forecast, and 5-day forecast
- **Interactive charts** for temperature trends using Recharts
- **Temperature unit toggle** (°C/°F) with preference persistence
- **Responsive design** optimized for desktop and mobile
- **Real-time data** via OpenWeather API integration

## Tech Stack

- **React** (Vite)
- **Redux Toolkit** for state management
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Recharts** for data visualization
- **OpenWeather API** for weather data

## Live Demo

[https://sanjay-weather-dashboard.netlify.app/](https://sanjay-weather-dashboard.netlify.app/)

## Setup Instructions

1. **Clone the repository**
```bash
   git clone https://github.com/sanjayloncha/weather-dashboard.git
   cd weather-analytics-dashboard
```

2. **Install dependencies**
```bash
   npm install
```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
```env
   VITE_OPENWEATHER_API_KEY=your_api_key_here
```
   
   Get your free API key from [OpenWeather](https://openweathermap.org/api)

4. **Run the development server**
```bash
   npm run dev
```

5. **Build for production**
```bash
   npm run build
```

## Project Structure
```
src/
├── components/     # Reusable UI components
├── pages/          # Page components
├── store/          # Redux store and slices
├── services/       # API integration
└── utils/          # Helper functions
```

## License

MIT