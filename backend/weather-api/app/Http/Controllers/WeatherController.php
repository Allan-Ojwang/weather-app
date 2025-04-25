<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Carbon\Carbon;

class WeatherController extends Controller
{
    public function getWeather(Request $request)
    {
        $city = $request->query('city');
        $apiKey = env('OPENWEATHERMAP_API_KEY');

        if (!$city) {
            return response()->json(['error' => 'City is required'], 400);
        }

        $response = Http::get("https://api.openweathermap.org/data/2.5/forecast", [
            'q' => $city,
            'appid' => $apiKey,
            'units' => 'metric'
        ]);

        if ($response->failed()) {
            return response()->json(['error' => 'Failed to fetch weather data'], 500);
        }

        $data = $response->json();
        $forecasts = $data['list'];
        $cityInfo = $data['city'];

        $today = Carbon::now()->format('Y-m-d');
        $currentWeatherEntry = null;
        $dailyForecasts = [];

        foreach ($forecasts as $entry) {
            $date = substr($entry['dt_txt'], 0, 10);

            // First entry for today becomes the "current weather"
            if ($date === $today && !$currentWeatherEntry) {
                $currentWeatherEntry = [
                    'date' => Carbon::parse($entry['dt_txt'])->toFormattedDateString(),
                    'temperature' => round($entry['main']['temp']),
                    'description' => $entry['weather'][0]['description'],
                    'icon' => $entry['weather'][0]['icon'],
                    'wind_speed' => $entry['wind']['speed'],
                    'humidity' => $entry['main']['humidity']
                ];
            }

            // Forecasts for the next 3 days (excluding today)
            if ($date !== $today) {
                if (!isset($dailyForecasts[$date])) {
                    $dailyForecasts[$date] = [
                        'date' => Carbon::parse($entry['dt_txt'])->toFormattedDateString(),
                        'min_temp' => $entry['main']['temp_min'],
                        'max_temp' => $entry['main']['temp_max'],
                        'icon' => $entry['weather'][0]['icon']
                    ];
                } else {
                    $dailyForecasts[$date]['min_temp'] = min($dailyForecasts[$date]['min_temp'], $entry['main']['temp_min']);
                    $dailyForecasts[$date]['max_temp'] = max($dailyForecasts[$date]['max_temp'], $entry['main']['temp_max']);
                }
            }

            if (count($dailyForecasts) >= 3) {
                break;
            }
        }

        return response()->json([
            'city' => $cityInfo['name'],
            'country' => $cityInfo['country'],
            'current' => $currentWeatherEntry,
            'forecast' => array_values($dailyForecasts)
        ]);
    }
}
