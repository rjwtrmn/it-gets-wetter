import type { Dispatch, SetStateAction } from "react";
import './weatherLocationInput.scss';

export function WeatherLocationInput({ setLocation, ...props }: {
    setLocation: Dispatch<SetStateAction<string | null>>,
}) {
    return <input
        className="weather-location-input"
        placeholder="Enter a town, city or postcode"
        {...props}
        onKeyUp={(event) => {
            if (event.key === "Enter") {
                setLocation((event.target as HTMLInputElement).value)
            }
        }}
    />;
}