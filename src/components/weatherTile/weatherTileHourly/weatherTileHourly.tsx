import type { Forecast, ForecastHour, Forecasts } from "../../../models/forecasts.ts";
import {
    type CSSProperties,
    type Dispatch,
    type PropsWithChildren,
    type SetStateAction,
    useEffect,
    useRef
} from "react";
import { isFuture } from "date-fns/isFuture";
import { isToday } from "date-fns/isToday";
import { formatDate } from "date-fns/format";
import { WeatherIcon } from "../../weatherIcon/weatherIcon.tsx";
import { MaterialSymbolsIcon } from "../../materialSymbolsIcon/materialSymbolsIcon.tsx";
import { WeatherTileDetailItem } from "../weatherTileDetailItem/weatherTileDetailItem.tsx";
import './weatherTileHourly.scss';

export function WeatherTileHourDetailItem({ children, icon }: PropsWithChildren<{
    icon: string,
}>) {
    return <WeatherTileDetailItem icon={ icon } className="weather-tile__hourly__details__detail__item">
        { children }
    </WeatherTileDetailItem>;
}

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

const rgbColdest = { r: 162, g: 209, b: 232 };
const rgbMid = { r: 248, g: 240, b: 162 };
const rgbHottest = { r: 255, g: 205, b: 193 };

function calcRGBForTemp(temp: number, floorTemp: number, ceilTemp: number) {
    const midTemp = (floorTemp + ceilTemp) / 2;
    if (temp === midTemp) {
        return rgbMid;
    }
    if (temp >= ceilTemp) {
        return rgbHottest;
    }
    if (temp <= floorTemp) {
        return rgbColdest;
    }

    let floorRGB: { r: number, g: number, b: number };
    let ceilRGB: { r: number, g: number, b: number };

    if (temp >= midTemp) {
        floorRGB = rgbMid;
        ceilRGB = rgbHottest;
    } else {
        floorRGB = rgbColdest;
        ceilRGB = rgbMid;
    }

    const tempRange = Math.abs(ceilTemp - floorTemp);
    const tempDifference = Math.abs(temp - floorTemp);
    const ratio = tempDifference / tempRange;

    const calcNewColourPart = (part1: number, part2: number, ratio: number) => {
        const range = Math.abs(part1 - part2);
        let diff = (range * ratio);
        if (part1 > part2) {
            diff = -diff;
        }
        return Math.round(part1 + diff);
    };

    const r = calcNewColourPart(floorRGB.r, ceilRGB.r, ratio);
    const g = calcNewColourPart(floorRGB.g, ceilRGB.g, ratio);
    const b = calcNewColourPart(floorRGB.b, ceilRGB.b, ratio);
    return { r, g, b };
}

export function WeatherTileHourly({ forecastData, forecast, expandedHour, setExpandedHour }: {
    forecastData: Forecasts,
    forecast: Forecast,
    expandedHour: ForecastHour | null,
    setExpandedHour: Dispatch<SetStateAction<ForecastHour | null>>,
}) {
    const currentDayHours = forecast.hour;

    const nextDayIndex = forecastData.forecastday.indexOf(forecast) + 1;
    const nextDayHours = forecastData.forecastday[nextDayIndex]?.hour || [];

    const futureHours = currentDayHours.filter((hour) => isFuture(new Date(hour.time)));
    const futureNextDayHours = nextDayHours.slice(0, 6);
    futureHours.push(...futureNextDayHours);

    return <section className="weather-tile__hourly">
        <div className="weather-tile__hourly__title">
            <h2>
                {
                    isToday(new Date(forecast.date))
                        ? 'Today'
                        : formatDate(new Date(forecast.date), 'EE do')
                }
            </h2>
            <h3>Hourly breakdown</h3>
        </div>
        <div className="weather-tile__hourly__hours">
            {
                futureHours.map((hour) => {
                        const { r, g, b } = calcRGBForTemp(hour.temp_c, forecast.day.mintemp_c, forecast.day.maxtemp_c);
                        const colourVariable = { '--weather-tile-hour-temp-color': `rgb(${ r },${ g },${ b }` };
                        return <button
                            style={ colourVariable as CSSProperties }
                            onClick={ () => setExpandedHour(hour) }
                            key={ hour.time }
                            className={ `weather-tile__hourly__hour ${ (expandedHour?.time === hour.time) ? 'weather-tile__hourly__hour_expanded' : '' }` }
                        >
                            <span className="weather-tile__hourly__hour__time">
                                <strong>{ formatDate(new Date(hour.time), 'HH') }</strong>
                                <span>{ formatDate(new Date(hour.time), 'mm') }</span>
                            </span>
                            <WeatherIcon
                                className="weather-tile__hourly__hour__condition weather-tile__hourly__hour__icon"
                                code={ hour.condition.code }
                            />
                            <span className="weather-tile__hourly__hour__item weather-tile__hourly__hour__temp">
                                { Math.round(hour.temp_c) }°C
                            </span>
                            <span className="weather-tile__hourly__hour__item">
                                <MaterialSymbolsIcon className="weather-tile__hourly__hour__icon" icon="water_drop"/>
                                { Math.round(hour.chance_of_rain) }%
                            </span>
                        </button>;
                    }
                )
            }
        </div>
        { expandedHour &&
            <WeatherTileHourlyDetails expandedHour={ expandedHour } setExpandedHour={ setExpandedHour }/> }
    </section>;
}