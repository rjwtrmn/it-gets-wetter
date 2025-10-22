import { formatDate } from "date-fns/format";
import { isToday } from "date-fns/isToday";
import type { Dispatch, SetStateAction } from "react";
import type { Forecast, Forecasts } from "../../../models/forecasts.ts";
import { WeatherIcon } from "../../weatherIcon/weatherIcon.tsx";
import './weatherTileForecast.scss';

export function WeatherTileForecast({ forecastData, setForecast, expandedForecast }: {
    forecastData: Forecasts,
    setForecast: Dispatch<SetStateAction<Forecast>>,
    expandedForecast: Forecast,
}) {
    return <section className="weather-tile__forecast">
        {
            forecastData.forecastday.map((forecast) => {
                const isExpanded = expandedForecast?.date === forecast.date;
                return <button
                    onClick={ () => setForecast(forecast) }
                    key={ forecast.date }
                    className={ `weather-tile__forecast__day ${ isExpanded ? 'weather-tile__forecast__day_expanded' : '' }` }
                >
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
                    <WeatherIcon className="weather-tile__icon weather-tile__forecast__day__icon"
                                 code={ forecast.day.condition.code }/>
                </button>;
            })
        }
    </section>;
}