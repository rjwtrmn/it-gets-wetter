import type { Dispatch, SetStateAction } from "react";
import './weatherLocationInput.scss';
import { MaterialSymbolsIcon } from "../materialSymbolsIcon/materialSymbolsIcon.tsx";

export function WeatherLocationInput({ setLocation, ...props }: {
    setLocation: Dispatch<SetStateAction<string | null>>,
}) {
    return <div className="weather-location-input">
        <MaterialSymbolsIcon className="weather-location-input__icon" icon={'globe'}/>
        <input
            className="weather-location-input__input"
            placeholder="Enter a town, city or postcode"
            { ...props }
            onKeyUp={ (event) => {
                if (event.key === "Enter") {
                    setLocation((event.target as HTMLInputElement).value)
                }
            } }
        />
    </div>;
}