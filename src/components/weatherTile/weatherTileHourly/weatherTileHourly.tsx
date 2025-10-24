import { formatDate } from "date-fns/format";
import { isAfter } from "date-fns/isAfter";
import { isToday } from "date-fns/isToday";
import { type CSSProperties, type Dispatch, type SetStateAction } from "react";
import type { Forecast, ForecastHour, Forecasts } from "../../../models/forecasts.ts";
import type { Location } from "../../../models/location.ts";
import { MaterialSymbolsIcon } from "../../materialSymbolsIcon/materialSymbolsIcon.tsx";
import { WeatherIcon } from "../../weatherIcon/weatherIcon.tsx";
import { WeatherTileHourlyDetails } from "./weatherTileHourlyDetails/weatherTileHourlyDetails.tsx";
import './weatherTileHourly.scss';

const rgbColdest = { r: 162, g: 209, b: 232 };
const rgbMid = { r: 248, g: 240, b: 162 };
const rgbHottest = { r: 255, g: 205, b: 193 };

export function calcRGBForTemp(temp: number, floorTemp: number, ceilTemp: number) {
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

export function WeatherTileHourly({ forecastData, forecast, expandedHour, setExpandedHour, location }: {
    forecastData: Forecasts,
    forecast: Forecast,
    expandedHour: ForecastHour | null,
    setExpandedHour: Dispatch<SetStateAction<ForecastHour | null>>,
    location: Location,
}) {
    const currentDayHours = forecast.hour;

    const nextDayIndex = forecastData.forecastday.indexOf(forecast) + 1;
    const nextDayHours = forecastData.forecastday[nextDayIndex]?.hour || [];

    const futureHours = currentDayHours.filter((hour) => isAfter(new Date(hour.time), new Date(location.localtime)));
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
                        const colourVariable = { '--weather-tile-hour-temp-color': `${ r },${ g },${ b }` };
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