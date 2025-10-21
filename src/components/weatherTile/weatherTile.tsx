import './weatherTile.scss';
import type { Location } from "../../models/location.ts";
import type { Current } from "../../models/current.ts";
import type { Forecast, ForecastDay, ForecastHour, Forecasts } from "../../models/forecasts.ts";
import { formatDate } from "date-fns/format";
import { weatherImageMapping } from "./weatherImageMapping.ts";
import {
    type CSSProperties,
    type Dispatch,
    type PropsWithChildren,
    type SetStateAction,
    useEffect,
    useRef,
    useState
} from "react";
import { isToday } from "date-fns/isToday";
import { isFuture } from "date-fns/isFuture";

export function WeatherTileImage({ className, code }: {
    className: string;
    code: number;
}) {
    const image = weatherImageMapping[code] || weatherImageMapping.default;
    return <img className={className + ' weather-tile__image'} src={image.src} alt={image.alt}/>;
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

export function WeatherTileDetailItem({ children, icon, className }: PropsWithChildren<{
    icon: string,
    className: string,
}> ) {
    return <span className={className + ' weather-tile__detail-item'}>
        <MaterialSymbolsIcon className={className + '__icon'} icon={icon}></MaterialSymbolsIcon>
        <span>{ children }</span>
    </span>;
}

export function WeatherTileCurrentDetailItem({ children, icon }: PropsWithChildren<{
    icon: string,
}> ) {
    return <WeatherTileDetailItem icon={icon} className="weather-tile__main__details__item">
        { children }
    </WeatherTileDetailItem>;
}

export function WeatherTileHourDetailItem({ children, icon }: PropsWithChildren<{
    icon: string,
}> ) {
    return <WeatherTileDetailItem icon={icon} className="weather-tile__hourly__details__detail__item">
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
    }, [expandedHour]);

    return <div ref={ref} className="weather-tile__hourly__details">
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
                <button onClick={() => setExpandedHour(null)}>
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

function calcRGBForTemp(temp: number, floorTemp: number, ceilTemp: number, avgTemp: number) {
    if (temp === avgTemp) {
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

    if (temp >= avgTemp) {
        floorRGB = rgbMid;
        ceilRGB = rgbHottest;
    } else {
        floorRGB = rgbColdest;
        ceilRGB = rgbMid;
    }

    const tempRange = Math.abs(ceilTemp - floorTemp);
    const tempDifference = Math.abs(temp - floorTemp);
    const ratio = tempDifference/tempRange;

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
    return { r, g, b};
}

export function WeatherTileHourly({ forecastData, forecast, expandedHour, setExpandedHour }: {
    forecastData: Forecasts,
    forecast: Forecast,
    expandedHour: ForecastHour | null,
    setExpandedHour: Dispatch<SetStateAction<ForecastHour| null>>,
}) {
    const currentDayHours = forecast.hour;

    const nextDayIndex = forecastData.forecastday.indexOf(forecast) + 1;
    const nextDayHours = forecastData.forecastday[nextDayIndex]?.hour || [];

    const futureHours = currentDayHours.filter((hour) => isFuture(new Date(hour.time)));
    const futureNextDayHours = nextDayHours.slice(0,6);
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
                    const { r, g, b } = calcRGBForTemp(hour.temp_c, forecast.day.mintemp_c, forecast.day.maxtemp_c, forecast.day.avgtemp_c);
                    const colourVariable = { '--weather-tile-hour-temp-color': `rgb(${r},${g},${b}` };
                        return <button
                                style={ colourVariable  as CSSProperties }
                                onClick={ () => setExpandedHour(hour) }
                                key={ hour.time }
                                className={ `weather-tile__hourly__hour ${ (expandedHour?.time === hour.time) ? 'weather-tile__hourly__hour_expanded' : '' }` }
                            >
                            <span className="weather-tile__hourly__hour__time">
                                <strong>{ formatDate(new Date(hour.time), 'HH') }</strong>
                                <span>{ formatDate(new Date(hour.time), 'mm') }</span>
                            </span>
                                <WeatherTileIcon
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
        { expandedHour && <WeatherTileHourlyDetails expandedHour={ expandedHour } setExpandedHour={ setExpandedHour }/> }
    </section>;
}

export function WeatherTileForecast({ forecastData, setForecast, expandedForecast }: {
    forecastData: Forecasts,
    setForecast: Dispatch<SetStateAction<Forecast>>,
    expandedForecast: Forecast,
}) {
    return <section className="weather-tile__forecast">
        {
            forecastData.forecastday.map((forecast) => {
                const isExpanded = expandedForecast?.date === forecast.date;
                return <button onClick={() => setForecast(forecast)} key={forecast.date} className={ `weather-tile__forecast__day ${isExpanded ? 'weather-tile__forecast__day_expanded' : ''}` }>
                    <div className="weather-tile__forecast__day__text">
                        {
                            isToday(forecast.date)
                                ? <span>Today</span>
                                : <span>
                                    { formatDate(new Date(forecast.date), 'EE') }
                                    <strong> { formatDate(new Date(forecast.date), 'do') }</strong>
                                </span>
                        }
                        <div className="weather-tile__forecast__day__text__temp">
                            { Math.round(forecast.day.maxtemp_c) }°C / { Math.round(forecast.day.mintemp_c) }°C
                        </div>
                    </div>
                    <WeatherTileIcon className="weather-tile__icon weather-tile__forecast__day__icon" code={ forecast.day.condition.code }/>
                </button>;
            })
        }
    </section>;
}

export function WeatherTileCurrent({ currentData, locationData, children }: PropsWithChildren<{
    currentData: Current,
    locationData: Location,
}>) {
    return <section className="weather-tile__main">
        <WeatherTileImage className="weather-tile__main__image" code={currentData.condition.code}/>
        <div className="weather-tile__main__title">
            <h1 className="weather-tile__main__location">{ locationData.name }</h1>
            <span className="h2 weather-tile__main__region">{ locationData.region }</span>
        </div>
        <div className="weather-tile__main__subtitle">
            <h2 className="weather-tile__main__text">{ currentData.condition.text }</h2>
            <WeatherTileIcon className="weather-tile__main__icon" code={ currentData.condition.code }/>
        </div>
        <div className="h2 weather-tile__main__temp"><strong>{ Math.round(currentData.temp_c) }°C</strong></div>
        <div className="weather-tile__main__details">
            <WeatherTileCurrentDetailItem icon="air">{ currentData.wind_kph } kph, { currentData.wind_dir }</WeatherTileCurrentDetailItem>
            <WeatherTileCurrentDetailItem icon="water_drop">{ currentData.humidity } %</WeatherTileCurrentDetailItem>
            <WeatherTileCurrentDetailItem icon="thermometer">Feels like { currentData.feelslike_c } °C</WeatherTileCurrentDetailItem>
            <WeatherTileCurrentDetailItem icon="blood_pressure">{ currentData.pressure_mb } mb</WeatherTileCurrentDetailItem>
            <WeatherTileCurrentDetailItem icon="sunny">{ currentData.uv }</WeatherTileCurrentDetailItem>
        </div>
        { children }
    </section>
}

export function WeatherTileFuture({ forecastDay, locationData, children }: PropsWithChildren<{
    forecastDay: ForecastDay,
    locationData: Location,
}>) {
    return <section className="weather-tile__main">
        <WeatherTileImage className="weather-tile__main__image" code={forecastDay.condition.code}/>
        <div className="weather-tile__main__title">
            <h1 className="weather-tile__main__location">{ locationData.name }</h1>
            <span className="h2 weather-tile__main__region">{ locationData.region }</span>
        </div>
        <div className="weather-tile__main__subtitle">
            <h2 className="weather-tile__main__text">{ forecastDay.condition.text }</h2>
            <WeatherTileIcon className="weather-tile__main__icon" code={ forecastDay.condition.code }/>
        </div>
        <div className="h2 weather-tile__main__temp">
            <strong>{ Math.round(forecastDay.maxtemp_c) }°C</strong> / { Math.round(forecastDay.mintemp_c) }°C
        </div>
        <div className="weather-tile__main__details">
            <WeatherTileCurrentDetailItem icon="air">{ forecastDay.maxwind_kph } kph</WeatherTileCurrentDetailItem>
            <WeatherTileCurrentDetailItem icon="water_drop">{ forecastDay.avghumidity } %</WeatherTileCurrentDetailItem>
            <WeatherTileCurrentDetailItem icon="sunny">{ forecastDay.uv }</WeatherTileCurrentDetailItem>
        </div>
        { children }
    </section>
}

export function WeatherTile({ locationData, currentData, forecastData }: {
    locationData: Location;
    currentData: Current;
    forecastData: Forecasts;
}) {
    const [forecast, setForecast] = useState<Forecast>(forecastData.forecastday[0]);
    const [ expandedHour, setExpandedHour ] = useState<ForecastHour | null>(null);

    useEffect(() => {
        setExpandedHour(null);
    }, [forecast])

    const forecasts = <WeatherTileForecast forecastData={ forecastData } setForecast={setForecast} expandedForecast={forecast}/>;

    const main = forecast === null || isToday(new Date(forecast.date))
        ? <WeatherTileCurrent currentData={ currentData } locationData={ locationData }>{ forecasts }</WeatherTileCurrent>
        : <WeatherTileFuture forecastDay={ forecast.day } locationData={ locationData }>{ forecasts }</WeatherTileFuture>;

    return <div className="weather-tile">
        { main }
        <WeatherTileHourly
            forecastData={ forecastData }
            forecast={forecast}
            expandedHour={ expandedHour }
            setExpandedHour={ setExpandedHour }
        />
    </div>;
}