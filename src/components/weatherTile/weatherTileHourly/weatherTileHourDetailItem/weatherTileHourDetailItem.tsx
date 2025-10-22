import type { PropsWithChildren } from "react";
import { WeatherTileDetailItem } from "../../weatherTileDetailItem/weatherTileDetailItem.tsx";

export function WeatherTileHourDetailItem({ children, icon }: PropsWithChildren<{
    icon: string,
}>) {
    return <WeatherTileDetailItem icon={ icon } className="weather-tile__hourly__details__detail__item">
        { children }
    </WeatherTileDetailItem>;
}