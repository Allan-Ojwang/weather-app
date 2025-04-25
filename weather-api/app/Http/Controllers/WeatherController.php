<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class WeatherController extends Controller
{
    public function getWeather(Request $request)
    {
        $city = $request->query('city');
        $apiKey = env('OPENWEATHERMAP_API_KEY');

        if (!$city) {
            return response()->json(['error' => 'City is required'], 400);
        }

        $response = Http::get("https://api.openweathermap.org/data/2.5/weather", [
            'q' => $city,
            'appid' => $apiKey,
            'units' => 'metric'
        ]);

        if ($response->failed()) {
            return response()->json(['error' => 'Failed to fetch weather'], 500);
        }

        return $response->json();
    }
}
