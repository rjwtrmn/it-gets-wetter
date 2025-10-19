import type { WeatherConditions } from "./weatherConditions.ts";

export interface Current {
    last_updated: string;
    last_updated_epoch: number;
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
    uv: number;
    gust_mph: number;
    gust_kph: number;
}