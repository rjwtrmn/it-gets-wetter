import './weatherTile.scss';
import type { Location } from "../../models/location.ts";
import type { Current } from "../../models/current.ts";
import type { Forecast, ForecastHour, Forecasts } from "../../models/forecasts.ts";
import { type ReactNode, useEffect, useState } from "react";
import { WeatherTileHourly } from "./weatherTileHourly/weatherTileHourly.tsx";
import { WeatherTileForecast } from "./weatherTileForecast/weatherTileForecast.tsx";
import { WeatherTileCurrent } from "./weatherTileCurrent/weatherTileCurrent.tsx";
import { WeatherTileFuture } from "./weatherTileFuture/weatherTileFuture.tsx";
import { isSameDay } from "date-fns/isSameDay";

export function WeatherTile({ locationData, currentData, forecastData, locationInput }: {
    locationData: Location;
    currentData: Current;
    forecastData: Forecasts;
    locationInput: ReactNode,
}) {
    const [ forecast, setForecast ] = useState<Forecast>(forecastData.forecastday[0]);
    const [ expandedHour, setExpandedHour ] = useState<ForecastHour | null>(null);

    useEffect(() => setForecast(forecastData.forecastday[0]), [forecastData])
    useEffect(() => setExpandedHour(null), [forecast])

    const forecasts = <WeatherTileForecast
        forecastData={ forecastData }
        setForecast={setForecast}
        expandedForecast={forecast}
    />;

    const main = forecast === null || isSameDay(new Date(locationData.localtime), new Date(forecast.date))
        ? <WeatherTileCurrent
            currentData={ currentData }
            locationData={ locationData }
            locationInput={ locationInput }
            forecasts={ forecasts }
        />
        : <WeatherTileFuture
            forecastDay={ forecast.day }
            locationData={ locationData }
            locationInput={ locationInput }
            forecasts={ forecasts }
        />;

    return <div className="weather-tile">
        { main }
        <WeatherTileHourly
            forecastData={ forecastData }
            forecast={forecast}
            expandedHour={ expandedHour }
            setExpandedHour={ setExpandedHour }
            location={ locationData }
        />
    </div>;
}