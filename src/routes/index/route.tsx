import { QueryClient, queryOptions, useQuery } from "@tanstack/react-query";
import { WeatherTile } from "../../components/weatherTile/weatherTile.tsx";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useGeolocation } from "../../hooks/useGeolocation.tsx";
import { WeatherLocationInput } from "../../components/weatherLocationInput/weatherLocationInput.tsx";

const weatherApiKey = import.meta.env.VITE_WEATHER_API_KEY;
const weatherApiPath = import.meta.env.VITE_WEATHER_API_PATH;
const defaultWeatherLocation = import.meta.env.VITE_WEATHER_LOCATION_DEFAULT;

const queryClient = new QueryClient();

const nextWeeklyWeatherQueryOptions = queryOptions({
    queryKey: ['nextWeeklyWeather', defaultWeatherLocation],
    queryFn: async ({ queryKey }) => {
        const response = await fetch(`${weatherApiPath}/forecast.json?key=${weatherApiKey}&q=${queryKey[1]}&days=8`);
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

    useEffect(() => {
        if (!isGeoPending) {
            setLocation(geolocation || defaultWeatherLocation);
        }
    }, [ isGeoPending, geolocation ]);

    const { data, isPending } = useQuery(queryOptions({
        queryKey: ['nextWeeklyWeather', location],
        queryFn: async ({ queryKey }) => {
            const response = await fetch(`${weatherApiPath}/forecast.json?key=${weatherApiKey}&q=${queryKey[1]}&days=8`);
            return await response.json();
        },
        enabled: !!location
    }));

    if (isPending) {
        return <span>Loading...</span>;
    }

    const input = <WeatherLocationInput setLocation={setLocation}/>;

    return <main>
        <WeatherTile
            currentData={data.current}
            forecastData={data.forecast}
            locationData={data.location}
            locationInput={input}
        />
    </main>
}