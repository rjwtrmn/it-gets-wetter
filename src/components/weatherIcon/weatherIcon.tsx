import { MaterialSymbolsIcon } from "../materialSymbolsIcon/materialSymbolsIcon.tsx";
import { weatherImageMapping } from "../weatherImage/weatherImageMapping.ts";
import './weatherIcon.scss';

export function WeatherIcon({ className, code }: {
    className: string;
    code: number;
}) {
    const imageDetails = weatherImageMapping[code] || weatherImageMapping.default;
    return <MaterialSymbolsIcon className={ className + ' weather-icon' } icon={ imageDetails.icon }/>;
}