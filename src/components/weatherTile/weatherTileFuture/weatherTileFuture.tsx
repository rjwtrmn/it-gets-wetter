import type { ReactNode } from "react";
import type { ForecastDay } from "../../../models/forecasts.ts";
import type { Location } from "../../../models/location.ts";
import { WeatherTileCurrentDetailItem } from "../weatherTileCurrent/weatherTileCurrent.tsx";
import { WeatherTileMain } from "../weatherTileMain/weatherTileMain.tsx";

export function WeatherTileFuture({ forecastDay, locationData, forecasts }: {
    forecastDay: ForecastDay,
    locationData: Location,
    forecasts: ReactNode,
}) {

    const temp = <>
        <strong>{ Math.round(forecastDay.maxtemp_c) }°C</strong> / { Math.round(forecastDay.mintemp_c) }°C</>;

    const details = [
        <WeatherTileCurrentDetailItem icon="air">{ forecastDay.maxwind_kph } kph</WeatherTileCurrentDetailItem>,
        <WeatherTileCurrentDetailItem icon="water_drop">{ forecastDay.avghumidity } %</WeatherTileCurrentDetailItem>,
        <WeatherTileCurrentDetailItem icon="sunny">{ forecastDay.uv }</WeatherTileCurrentDetailItem>,
    ];

    return <WeatherTileMain
        condition={ forecastDay.condition }
        locationData={ locationData }
        temp={ temp }
        details={ details }
        forecasts={ forecasts }
    />;
}