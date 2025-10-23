import { QueryClient, queryOptions, useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useTransition } from "react";
import './home.scss';
import { DarkModeToggle } from "../../components/darkModeToggle/darkModeToggle.tsx";
import { LoaderOverlay } from "../../components/loaderOverlay/loaderOverlay.tsx";
import { WeatherLocationInput } from "../../components/weatherLocationInput/weatherLocationInput.tsx";
import { WeatherTile } from "../../components/weatherTile/weatherTile.tsx";
import { useGeolocation } from "../../hooks/useGeolocation.tsx";
import type { Current } from "../../models/current.ts";
import type { Forecasts } from "../../models/forecasts.ts";
import type { Location } from "../../models/location.ts";

const weatherApiKey = import.meta.env.VITE_WEATHER_API_KEY;
const weatherApiPath = import.meta.env.VITE_WEATHER_API_PATH;
const defaultWeatherLocation = import.meta.env.VITE_WEATHER_LOCATION_DEFAULT;

const queryClient = new QueryClient();

const nextWeeklyWeatherQueryOptions = queryOptions({
    queryKey: [ 'nextWeeklyWeather', defaultWeatherLocation ],
    queryFn: async ({ queryKey }) => {
        const response = await fetch(`${ weatherApiPath }/forecast.json?key=${ weatherApiKey }&q=${ queryKey[1] }&days=8`);
        return await response.json();
    }
});

export const Route = createFileRoute('/')({
    loader: () => queryClient.ensureQueryData(nextWeeklyWeatherQueryOptions),
    component: Home,
});

export function Home() {
    const [ geolocation, isGeoPending ] = useGeolocation();
    const [ location, setLocation ] = useState<string | null>(null);
    const [ weatherData, setWeatherData ] = useState<{
        current: Current,
        location: Location,
        forecast: Forecasts
    } | null>(null);
    const [ _, startTransition ] = useTransition();

    const { data, isPending } = useQuery(queryOptions({
        queryKey: [ 'nextWeeklyWeather', location ],
        queryFn: async ({ queryKey }) => {
            const response = await fetch(`${ weatherApiPath }/forecast.json?key=${ weatherApiKey }&q=${ queryKey[1] }&days=8`);
            return await response.json();
        },
        enabled: !!location
    }));

    useEffect(() => {
        if (!isGeoPending && !location) {
            setLocation(geolocation || defaultWeatherLocation);
        }
    }, [ isGeoPending, geolocation ]);

    useEffect(() => {
        if (data) {
            startTransition(() => {
                setWeatherData(data);
            });
        }
    }, [ data ]);

    const input = <WeatherLocationInput setLocation={ setLocation }/>;

    return <div className="home">
        <LoaderOverlay visible={ !weatherData && isPending }/>
        { weatherData && <>
            <header className="home__header">
                <div className="home__header__location-input">
                    { input }
                </div>
                <DarkModeToggle/>
            </header>
            <WeatherTile
                currentData={ weatherData.current }
                forecastData={ weatherData.forecast }
                locationData={ weatherData.location }
            />
        </> }
    </div>;
}