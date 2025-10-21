import type { PropsWithChildren, ReactNode } from "react";
import { WeatherTileDetailItem } from "../weatherTileDetailItem/weatherTileDetailItem.tsx";
import type { Current } from "../../../models/current.ts";
import type { Location } from "../../../models/location.ts";
import { WeatherTileMain } from "../weatherTileMain/weatherTileMain.tsx";

export function WeatherTileCurrentDetailItem({ children, icon }: PropsWithChildren<{
    icon: string,
}>) {
    return <WeatherTileDetailItem icon={ icon } className="weather-tile__main__details__item">
        { children }
    </WeatherTileDetailItem>;
}

export function WeatherTileCurrent({ currentData, locationData, forecasts, locationInput }: {
    currentData: Current,
    locationData: Location,
    locationInput: ReactNode,
    forecasts: ReactNode,
}) {

    const temp = <strong>{ Math.round(currentData.temp_c) }°C</strong>;

    const details = [
        <WeatherTileCurrentDetailItem
            icon="air">{ currentData.wind_kph } kph, { currentData.wind_dir }</WeatherTileCurrentDetailItem>,
        <WeatherTileCurrentDetailItem icon="water_drop">{ currentData.humidity } %</WeatherTileCurrentDetailItem>,
        <WeatherTileCurrentDetailItem icon="thermometer">Feels
            like { currentData.feelslike_c } °C</WeatherTileCurrentDetailItem>,
        <WeatherTileCurrentDetailItem
            icon="blood_pressure">{ currentData.pressure_mb } mb</WeatherTileCurrentDetailItem>,
        <WeatherTileCurrentDetailItem icon="sunny">{ currentData.uv }</WeatherTileCurrentDetailItem>,
    ];

    return <WeatherTileMain
        condition={ currentData.condition }
        details={ details }
        forecasts={ forecasts }
        locationData={ locationData }
        locationInput={ locationInput }
        temp={ temp }
    />;
}