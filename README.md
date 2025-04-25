
# 🌦️ Weather Forecast App

 A modern weather forecast application built with Next.js for the frontend and Laravel (API-only) for the backend. It integrates with the OpenWeatherMap API to fetch real-time weather data, displaying current conditions and multi-day forecasts in a sleek and responsive UI designed with RippleUI and Tailwind CSS.


## Features

- 📍 Real-Time Weather - Data Displays current weather conditions (temperature, humidity, wind.) based on location.

- 📆 Multi-Day Forecasts See upcoming weather for the next 3 days with clear visuals.

## Demo

Below is the gif of the project.

![](https://github.com/Allan-Ojwang/weather-app/blob/master/demo.gif)


## Environment Variables

This project requires one to setup a `.env` file in the backend directory:

`OPENWEATHERMAP_API_KEY` = "your_api_key_here"



## Run Locally

Clone the project

```bash
  git clone https://github.com/Allan-Ojwang/weather-app
```

Go to the project directory

```bash
  cd frontend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

Open another terminal

```bash
  cd backend
  cd weather-api
```

Install dependencies

```bash
  composer install
```

Set up environment variables (Replace "your_api_key_here" with the actual api key)

```bash
  cp .env.example .env
```

Generate application key 
```bash
  php artisan key:generate
```

Start the server

```bash
  php artisan serve
```
## API Endpoints
The backend provides the following API endpoint:

- `GET /api/weather` - Get current weather and 3 days forecast

**Query Parameter**

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `city` | `string` | **Required**. Name of the city (e.g. Nairobi) |

**Example Request**

GET http://127.0.0.1:8000/api/weather?city=Nairobi

**Example Response**

```bash
  {
  "city": "Nairobi",
  "country": "KE",
  "current": {
    "temperature": 25,
    "description": "Clear sky",
    "icon": "01d",
    "date": "2025-04-25",
    "wind_speed": 10,
    "humidity": 60
  },
  "forecast": [
    {
      "date": "2025-04-26",
      "min_temp": 20,
      "max_temp": 28,
      "icon": "01d"
    },
    {
      "date": "2025-04-27",
      "min_temp": 21,
      "max_temp": 29,
      "icon": "02d"
    },
    {
      "date": "2025-04-28",
      "min_temp": 19,
      "max_temp": 26,
      "icon": "03d"
    }
  ]
} 
```

## Tech Stack

**✅ Frontend (Client-side)**

- Framework: Next.js

- Language: TypeScript

- Styling: Tailwind CSS

- UI Library: RippleUI (built on top of Tailwind)

- CSS Tools: PostCSS, Autoprefixer

**✅ Backend (Server-side)**

- Framework: Laravel 12

- Language: PHP

- API Source: OpenWeatherMap API

- Communication: REST API (decoupled architecture)

**✅ Build Tools / Environment**

- Package Manager: npm

- Dev Server: next dev (for frontend), Laravel’s built-in (php artisan serve)


## Feedback

If you have any feedback, please reach out to us at allan.o.ojwang@gmail.com


## License

MIT License

Copyright (c) 2025 Allan Ojwang

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
