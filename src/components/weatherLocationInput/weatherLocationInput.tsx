import { queryOptions, useQuery } from "@tanstack/react-query";
import {
    type Dispatch,
    type FormEvent,
    type SetStateAction,
    startTransition,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import './weatherLocationInput.scss';
import { weatherApiKey, weatherApiPath } from "../../env.tsx";
import type { SearchLocation } from "../../models/location.ts";
import { MaterialSymbolsIcon } from "../materialSymbolsIcon/materialSymbolsIcon.tsx";

export function WeatherLocationInput({ setLocation, ...props }: {
    setLocation: Dispatch<SetStateAction<string | null>>,
}) {
    const [ value, setValue ] = useState<string>('');
    const [ locations, setLocations ] = useState<SearchLocation[]>([]);
    const [ timeout, setTimeout ] = useState<number | null>(null);
    const [ expanded, setExpanded ] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const { data } = useQuery(queryOptions({
        queryKey: [ 'locationSearch', value ],
        queryFn: async ({ queryKey }) => {
            const response = await fetch(`${ weatherApiPath }/search.json?key=${ weatherApiKey }&q=${ queryKey[1] }`);
            return await response.json();
        },
        enabled: (!timeout && !!value)
    }));

    const updateWithDebounce = useCallback((wait: number) => {
        return (event: FormEvent<HTMLInputElement>) => {
            window.clearTimeout(timeout as number);
            const to = window.setTimeout(() => {
                setTimeout(null);
            }, wait);
            setValue((event.target as HTMLInputElement).value);
            setTimeout(to);
        };
    }, [timeout]);

    useEffect(() => {
        if (!timeout) {
            startTransition(() => {
                setLocations(data ?? []);
            })
        }
    }, [ data, timeout ]);

    const optionsList = locations.length > 0 && <ul
        className="weather-location-input__list"
        aria-expanded={ expanded }
        role="listbox"
    >
        { locations.map((location: SearchLocation) => <li
            key={ location.id }
            className="weather-location-input__list__item"
            onClick={() => {
                setLocation(location.url);
            }}
        >
            { location.name + ', ' + (location.region && location.region + ', ') + location.country }
        </li>)}
    </ul>;

    return <div
        className="weather-location-input"
        tabIndex={0}
        onFocus={(e) => {
            if (e.currentTarget === e.target) {
                inputRef.current?.focus();
            }
        }}
        onBlur={e => {
            if (!e.currentTarget.contains(e.relatedTarget)) {
                setExpanded(false);
            }
        }}
    >
        <input
            tabIndex={-1}
            className="weather-location-input__input"
            placeholder="Enter a town, city or postcode"
            value={ value }
            ref={ inputRef }
            { ...props }
            onFocus={() => setExpanded(true)}
            onInput={updateWithDebounce(1000)}
        />
        <MaterialSymbolsIcon className="weather-location-input__icon" icon="search"/>
        { optionsList }
    </div>;
}