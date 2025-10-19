import { QueryClient, queryOptions, useQuery } from "@tanstack/react-query";
import { WeatherTile } from "../../components/weatherTile/weatherTile.tsx";
import { createFileRoute } from "@tanstack/react-router";

const weatherApiKey = import.meta.env.VITE_WEATHER_API_KEY;
const weatherApiPath = import.meta.env.VITE_WEATHER_API_PATH;
const defaultWeatherLocation = import.meta.env.VITE_WEATHER_LOCATION_DEFAULT;

const queryClient = new QueryClient();

const nextWeeklyWeatherQueryOptions = queryOptions({
    queryKey: ['nextWeeklyWeather'],
    queryFn: async () => {
        const response = await fetch(`${weatherApiPath}/forecast.json?key=${weatherApiKey}&q=${defaultWeatherLocation}&days=8`);
        return await response.json();
    }
});

export const Route = createFileRoute('/')({
    loader: () => queryClient.ensureQueryData(nextWeeklyWeatherQueryOptions),
    component: Home,
});

export function Home() {
    const { data, isPending } = useQuery(nextWeeklyWeatherQueryOptions);

    if (isPending) {
        return <span>Loading...</span>;
    }

    return <>
        <WeatherTile currentData={data.current} forecastData={data.forecast} locationData={data.location}/>
    </>
}