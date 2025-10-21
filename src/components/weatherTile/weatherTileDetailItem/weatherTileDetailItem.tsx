import type { PropsWithChildren } from "react";
import { MaterialSymbolsIcon } from "../../materialSymbolsIcon/materialSymbolsIcon.tsx";
import './weatherTileDetailItem.scss';

export function WeatherTileDetailItem({ children, icon, className }: PropsWithChildren<{
    icon: string,
    className: string,
}>) {
    return <span className={ className + ' weather-tile__detail-item' }>
        <MaterialSymbolsIcon className={ className + '__icon' } icon={ icon }></MaterialSymbolsIcon>
        <span>{ children }</span>
    </span>;
}