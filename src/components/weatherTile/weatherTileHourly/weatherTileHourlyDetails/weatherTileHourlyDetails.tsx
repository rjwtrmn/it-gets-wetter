import { formatDate } from "date-fns/format";
import { type Dispatch, type SetStateAction, useEffect, useRef } from "react";
import type { ForecastHour } from "../../../../models/forecasts.ts";
import { MaterialSymbolsIcon } from "../../../materialSymbolsIcon/materialSymbolsIcon.tsx";
import { WeatherTileHourDetailItem } from "../weatherTileHourDetailItem/weatherTileHourDetailItem.tsx";

export function WeatherTileHourlyDetails({ expandedHour, setExpandedHour }: {
    expandedHour: ForecastHour,
    setExpandedHour: Dispatch<SetStateAction<ForecastHour | null>>,
}) {

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [ expandedHour ]);

    return <div ref={ ref } className="weather-tile__hourly__details">
        <div className="weather-tile__hourly__details__top">
            <div className="weather-tile__hourly__details__top__text">
                <h4>
                    <strong>{ formatDate(new Date(expandedHour.time), 'HH') }</strong>
                    <span>{ formatDate(new Date(expandedHour.time), 'mm') }</span>
                </h4>
                <div className="h2">
                    { expandedHour.condition.text }
                </div>
            </div>
            <button onClick={ () => setExpandedHour(null) }>
                <MaterialSymbolsIcon className="weather-tile__hourly__details__top__close" icon="close"/>
            </button>
        </div>
        <div className="weather-tile__hourly__details__detail">
            <WeatherTileHourDetailItem icon="air">
                <span className="weather-tile__detail-item__prefix">Wind speed: </span>
                { expandedHour.wind_kph } kph
            </WeatherTileHourDetailItem>
            <WeatherTileHourDetailItem icon="air">
                <span className="weather-tile__detail-item__prefix">Wind direction: </span>
                { expandedHour.wind_dir }
            </WeatherTileHourDetailItem>
            <WeatherTileHourDetailItem icon="humidity_percentage">
                <span className="weather-tile__detail-item__prefix">Humidity: </span>
                { expandedHour.humidity } %
            </WeatherTileHourDetailItem>
            <WeatherTileHourDetailItem icon="thermometer">
                <span className="weather-tile__detail-item__prefix">Feels like </span>
                { expandedHour.feelslike_c } °C
            </WeatherTileHourDetailItem>
            <WeatherTileHourDetailItem icon="blood_pressure">
                <span className="weather-tile__detail-item__prefix">Pressure: </span>
                { expandedHour.pressure_mb } mB
            </WeatherTileHourDetailItem>
            <WeatherTileHourDetailItem icon="cloud">
                <span className="weather-tile__detail-item__prefix">Cloud cover: </span>
                { expandedHour.cloud } %
            </WeatherTileHourDetailItem>
            <WeatherTileHourDetailItem icon="visibility">
                <span className="weather-tile__detail-item__prefix">Visibility: </span>
                { expandedHour.vis_km } km
            </WeatherTileHourDetailItem>
            <WeatherTileHourDetailItem icon="sunny">
                <span className="weather-tile__detail-item__prefix">UV index: </span>
                { expandedHour.uv }
            </WeatherTileHourDetailItem>
            <WeatherTileHourDetailItem icon="water_drop">
                <span className="weather-tile__detail-item__prefix">Chance of rain: </span>
                { expandedHour.chance_of_rain } %
            </WeatherTileHourDetailItem>
            <WeatherTileHourDetailItem icon="mode_cool">
                <span className="weather-tile__detail-item__prefix">Chance of snow: </span>
                { expandedHour.chance_of_snow } %
            </WeatherTileHourDetailItem>
        </div>
    </div>;
}

