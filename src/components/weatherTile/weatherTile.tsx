import './weatherTile.scss';
import type { Location } from "../../models/location.ts";
import type { Current } from "../../models/current.ts";
import type { ForecastHour, Forecasts } from "../../models/forecasts.ts";
import { formatDate } from "date-fns/format";
import { weatherImageMapping } from "./weatherImageMapping.ts";
import { type Dispatch, type PropsWithChildren, type SetStateAction, useEffect, useRef, useState } from "react";

export function WeatherTileImage({ className, code }: {
    className: string;
    code: number;
}) {
    const image = weatherImageMapping[code] || weatherImageMapping.default;
    return <img className={className} src={image.src} alt={image.alt}/>;
}

export function MaterialSymbolsIcon({ className, icon }: {
    className: string;
    icon: string;
}) {
    return <span className={'material-symbols-outlined ' + className}>{ icon }</span>;
}

export function WeatherTileIcon({ className, code }: {
    className: string;
    code: number;
}) {
    const imageDetails = weatherImageMapping[code] || weatherImageMapping.default;
    return <MaterialSymbolsIcon className={ className + ' weather-tile__icon' } icon={ imageDetails.icon }/>;
}

export function WeatherTileDetailItem({ children, icon, className }: PropsWithChildren<{ icon: string, className: string }> ) {
    return <span className={className + ' weather-tile__detail-item'}>
        <MaterialSymbolsIcon className={className + '__icon'} icon={icon}></MaterialSymbolsIcon>
        <span>{ children }</span>
    </span>;
}

export function WeatherTileCurrentDetailItem({ children, icon }: PropsWithChildren<{ icon: string }> ) {
    return <WeatherTileDetailItem icon={icon} className="weather-tile__current-details__item">
        { children }
    </WeatherTileDetailItem>;
}

export function WeatherTileHourDetailItem({ children, icon }: PropsWithChildren<{ icon: string }> ) {
    return <WeatherTileDetailItem icon={icon} className="weather-tile__hourly__details__detail__item">
        { children }
    </WeatherTileDetailItem>;
}

export function WeatherTileHourlyDetails({ expandedHourDetails, setExpandedHourDetails }: {
    expandedHourDetails: ForecastHour,
    setExpandedHourDetails: Dispatch<SetStateAction<ForecastHour | null>>,
}) {

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [expandedHourDetails]);

    return <div ref={ref} className="weather-tile__hourly__details">
            <div className="weather-tile__hourly__details__top">
                <div className="weather-tile__hourly__details__top__text">
                    <h4>
                        <strong>{ formatDate(new Date(expandedHourDetails.time), 'HH') }</strong>
                        <span>{ formatDate(new Date(expandedHourDetails.time), 'mm') }</span>
                    </h4>
                    <div className="h2">
                        { expandedHourDetails.condition.text }
                    </div>
                </div>
                <button onClick={() => setExpandedHourDetails(null)}>
                    <MaterialSymbolsIcon className="weather-tile__hourly__details__top__close" icon="close"/>
                </button>
            </div>
            <div className="weather-tile__hourly__details__detail">
                <WeatherTileHourDetailItem icon="air">
                    <span className="weather-tile__detail-item__prefix">Wind speed: </span>
                    { expandedHourDetails.wind_kph } kph
                </WeatherTileHourDetailItem>
                <WeatherTileHourDetailItem icon="air">
                    <span className="weather-tile__detail-item__prefix">Wind direction: </span>
                    { expandedHourDetails.wind_dir }
                </WeatherTileHourDetailItem>
                <WeatherTileHourDetailItem icon="humidity_percentage">
                    <span className="weather-tile__detail-item__prefix">Humidity: </span>
                    { expandedHourDetails.humidity } %
                </WeatherTileHourDetailItem>
                <WeatherTileHourDetailItem icon="thermometer">
                    <span className="weather-tile__detail-item__prefix">Feels like </span>
                    { expandedHourDetails.feelslike_c } °C
                </WeatherTileHourDetailItem>
                <WeatherTileHourDetailItem icon="blood_pressure">
                    <span className="weather-tile__detail-item__prefix">Pressure: </span>
                    { expandedHourDetails.pressure_mb } mB
                </WeatherTileHourDetailItem>
                <WeatherTileHourDetailItem icon="cloud">
                    <span className="weather-tile__detail-item__prefix">Cloud cover: </span>
                    { expandedHourDetails.cloud } %
                </WeatherTileHourDetailItem>
                <WeatherTileHourDetailItem icon="visibility">
                    <span className="weather-tile__detail-item__prefix">Visibility: </span>
                    { expandedHourDetails.vis_km } km
                </WeatherTileHourDetailItem>
                <WeatherTileHourDetailItem icon="sunny">
                    <span className="weather-tile__detail-item__prefix">UV index: </span>
                    { expandedHourDetails.uv }
                </WeatherTileHourDetailItem>
                <WeatherTileHourDetailItem icon="water_drop">
                    <span className="weather-tile__detail-item__prefix">Chance of rain: </span>
                    { expandedHourDetails.chance_of_rain } %
                </WeatherTileHourDetailItem>
                <WeatherTileHourDetailItem icon="mode_cool">
                    <span className="weather-tile__detail-item__prefix">Chance of snow: </span>
                    { expandedHourDetails.chance_of_snow } %
                </WeatherTileHourDetailItem>
            </div>
        </div>;
}

export function WeatherTileHourly({ forecastData }: { forecastData: Forecasts }) {
    const currentDayHours = forecastData.forecastday[0].hour;
    const nextDayHours = forecastData.forecastday[1].hour;
    const currentTime = new Date().getTime();
    const futureHours = currentDayHours.filter((hour) => new Date(hour.time).getTime() >= currentTime)
    const futureNextDayHours = nextDayHours.slice(0,6);
    futureHours.push(...futureNextDayHours);

    const [ expandedHourDetails, setExpandedHourDetails ] = useState<ForecastHour | null>(null);

    return <div className="weather-tile__hourly">
        <h2>Today</h2>
        <div className="weather-tile__hourly__hours">
            {
                futureHours.map((hour) =>
                    <button onClick={() => setExpandedHourDetails(hour)} key={hour.time} className={ `weather-tile__hourly__hour ${(!!expandedHourDetails && expandedHourDetails.time === hour.time) ? 'weather-tile__hourly__hour_expanded' : ''}` }>
                        <span className="weather-tile__hourly__hour__time">
                            <strong>{ formatDate(new Date(hour.time), 'HH') }</strong>
                            <span>{ formatDate(new Date(hour.time), 'mm') }</span>
                        </span>
                        <WeatherTileIcon className="weather-tile__hourly__hour__condition weather-tile__hourly__hour__icon" code={ hour.condition.code }/>
                        <span className="weather-tile__hourly__hour__item weather-tile__hourly__hour__temp">{ Math.round(hour.temp_c) }°C</span>
                        <span className="weather-tile__hourly__hour__item">
                            <MaterialSymbolsIcon className="weather-tile__hourly__hour__icon" icon="water_drop"/>
                            { Math.round(hour.chance_of_rain) }%
                        </span>
                    </button>
                )
            }
        </div>
        { expandedHourDetails && <WeatherTileHourlyDetails expandedHourDetails={ expandedHourDetails } setExpandedHourDetails={ setExpandedHourDetails }/> }
    </div>;
}

export function WeatherTileForecast({ forecastData }: { forecastData: Forecasts }) {
    return <div className="weather-tile__forecast">
        {
            forecastData.forecastday.map((forecast) => {
                return <div key={forecast.date} className="weather-tile__forecast__day">
                    { formatDate(new Date(forecast.date), 'EE do') }
                    { Math.round(forecast.day.maxtemp_c) }°C
                    { Math.round(forecast.day.mintemp_c) }°C
                    <WeatherTileImage className="weather-tile__image weather-tile__forecast__day__image" code={ forecast.day.condition.code }/>
                    <WeatherTileIcon className="weather-tile__icon weather-tile__forecast__day__icon" code={ forecast.day.condition.code }/>
                </div>;
            })
        }
    </div>;
}

export function WeatherTile({ locationData, currentData, forecastData }: {
    locationData: Location;
    currentData: Current;
    forecastData: Forecasts;
}) {
    return <div className="weather-tile">
        <div className="weather-tile__current">
            <WeatherTileImage className="weather-tile__current__image" code={currentData.condition.code}/>
            <div>
                <h1 className="weather-tile__current__location">
                    { locationData.name }
                </h1>
                <h2 className="weather-tile__current__text">
                    { currentData.condition.text }
                    <WeatherTileIcon className="weather-tile__current__icon" code={ currentData.condition.code }/>
                </h2>
            </div>
            <div className="h2">
                <strong>{ Math.round(currentData.temp_c) }°C</strong>
            </div>
            <div className="weather-tile__current-details">
                <WeatherTileCurrentDetailItem icon="air">
                    { currentData.wind_kph } kph, { currentData.wind_dir }
                </WeatherTileCurrentDetailItem>
                <WeatherTileCurrentDetailItem icon="water_drop">
                    { currentData.humidity } %
                </WeatherTileCurrentDetailItem>
                <WeatherTileCurrentDetailItem icon="thermometer">
                    Feels like { currentData.feelslike_c } °C
                </WeatherTileCurrentDetailItem>
                <WeatherTileCurrentDetailItem icon="blood_pressure">
                    { currentData.pressure_mb } mb
                </WeatherTileCurrentDetailItem>
                <WeatherTileCurrentDetailItem icon="sunny">
                    { currentData.uv }
                </WeatherTileCurrentDetailItem>
            </div>
        </div>
        <WeatherTileHourly forecastData={ forecastData }/>
    </div>;
}