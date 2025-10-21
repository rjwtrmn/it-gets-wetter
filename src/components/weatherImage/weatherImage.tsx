import { weatherImageMapping } from "./weatherImageMapping.ts";
import './weatherImage.scss';

export function WeatherImage({ className, code }: {
    className: string;
    code: number;
}) {
    const image = weatherImageMapping[code] || weatherImageMapping.default;
    const [ srcPath, extension ] = image.src.split('.');
    const wideSrc = srcPath + '-wide.' + extension;
    return <picture className={ className + ' weather-image' }>
        <source media="(width < 640px)" srcSet={ image.src }/>
        <source media="(width >= 640px)" srcSet={ wideSrc }/>
        <img src={ image.src } alt={ image.alt }/>
    </picture>
}