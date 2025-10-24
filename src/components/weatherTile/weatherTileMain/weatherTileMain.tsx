import type { ReactNode } from "react";
import type { Location } from "../../../models/location.ts";
import type { WeatherConditions } from "../../../models/weatherConditions.ts";
import { WeatherIcon } from "../../weatherIcon/weatherIcon.tsx";
import { WeatherImage } from "../../weatherImage/weatherImage.tsx";
import { weatherImageMapping } from "../../weatherImage/weatherImageMapping.ts";

export function WeatherTileMain({ condition, temp, locationData, details, forecasts }: {
    condition: WeatherConditions,
    details: ReactNode[],
    forecasts: ReactNode,
    locationData: Location,
    temp: ReactNode,
}) {
    console.log(condition.code);
    return <section className="weather-tile__main">
        <div className="weather-tile__main__title">
            <h1 className="weather-tile__main__location">{ locationData.name }</h1>
            <span className="h2 weather-tile__main__region">{ locationData.country }</span>
        </div>
        <div className="weather-tile__main__subtitle">
            <h2 className="weather-tile__main__text">{ condition.text }</h2>
            <WeatherIcon className="weather-tile__main__icon" code={ condition.code }/>
        </div>
        <div className="h2 weather-tile__main__temp">{ temp }</div>
        <div className="weather-tile__main__details">
            { ...details }
        </div>
        { forecasts }
        <figure className="weather-tile__main__image-wrapper">
            <WeatherImage className="weather-tile__main__image" code={ condition.code }/>
            <figcaption className="weather-tile__main__credit">Image
                by { weatherImageMapping[condition.code].credit }</figcaption>
        </figure>
    </section>;
}