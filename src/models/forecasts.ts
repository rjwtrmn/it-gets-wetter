import type { WeatherConditions } from "./weatherConditions.ts";

export interface Forecasts {
    forecastday: Forecast[];
}

export interface ForecastAstro {
    sunrise: string;
    sunset: string;
    moonrise: string;
    moonset: string;
    moon_phase: 'New Moon' | 'Waxing Crescent' | 'First Quarter' | 'Waxing Gibbous' | 'Full Moon' | 'Waning Gibbous' | 'Last Quarter' | 'Waning Crescent';
    moon_illumination: number;
    is_moon_up: 0 | 1;
    is_sun_up: 0 | 1;
}

export interface ForecastDay {
    maxtemp_c: number;
    maxtemp_f: number;
    mintemp_c: number;
    mintemp_f: number;
    avgtemp_c: number;
    avgtemp_f: number;
    maxwind_mph: number;
    maxwind_kph: number;
    totalprecip_mm: number;
    totalprecip_in: number;
    totalsnow_cm: number;
    avgvis_km: number;
    avgvis_miles: number;
    avghumidity: number;
    condition: WeatherConditions;
    uv: number;
    daily_will_it_rain: 0 | 1;
    daily_will_it_snow: 0 | 1;
    daily_chance_of_rain: number;
    daily_chance_of_snow: number;
}

export interface ForecastHour {
    time_epoch: number;
    time: string;
    temp_c: number;
    temp_f: number;
    is_day: number;
    condition: WeatherConditions;
    wind_mph: number;
    wind_kph: number;
    wind_degree: number;
    wind_dir: number;
    pressure_mb: number;
    pressure_in: number;
    precip_mm: number;
    precip_in: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    feelslike_f: number;
    windchill_c: number;
    windchill_f: number;
    heatindex_c: number;
    heatindex_f: number;
    dewpoint_c: number;
    dewpoint_f: number;
    will_it_rain: 0 | 1;
    chance_of_rain: number;
    will_it_snow: 0 | 1;
    chance_of_snow: number;
    vis_km: number;
    vis_miles: number;
    gust_mph: number;
    gust_kph: number;
    uv: number;
}

export interface Forecast {
    date: string;
    date_epoch: number;
    day: ForecastDay;
    astro: ForecastAstro;
    hour: ForecastHour[];
}