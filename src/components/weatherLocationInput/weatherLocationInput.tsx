import { queryOptions, useQuery } from "@tanstack/react-query";
import {
    type Dispatch,
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

export function WeatherLocationInputOptions({ locations, setLocation, expanded, selectedOption }: {
    locations: SearchLocation[];
    setLocation: Dispatch<SetStateAction<string | null>>;
    expanded: boolean;
    selectedOption: SearchLocation | null;
}) {
    return locations.length > 0 && <ul
        className="weather-location-input__list"
        aria-expanded={ expanded }
        role="listbox"
    >
        { locations.map((location: SearchLocation) => <li
            key={ location.id }
            className={ 'weather-location-input__list__item'}
            aria-selected={ selectedOption?.id === location.id }
            onClick={() => {
                setLocation(location.url);
            }}
        >
            { location.name + ', ' + (location.region && location.region + ', ') + location.country }
        </li>)}
    </ul>;
}

export function WeatherLocationInput({ setLocation, ...props }: {
    setLocation: Dispatch<SetStateAction<string | null>>,
}) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [ locations, setLocations ] = useState<SearchLocation[]>([]);
    const [ timeout, setTimeout ] = useState<number | null>(null);
    const [ expanded, setExpanded ] = useState<boolean>(false);
    const [ selectedOption, setSelectedOption ] = useState<SearchLocation | null>(null);

    const allowQuery = !timeout && !!inputRef.current?.value;
    const { data } = useQuery(queryOptions({
        queryKey: [ 'locationSearch', inputRef.current?.value ],
        queryFn: async ({ queryKey }) => {
            const response = await fetch(`${ weatherApiPath }/search.json?key=${ weatherApiKey }&q=${ queryKey[1] }`);
            return await response.json();
        },
        enabled: allowQuery,
    }));

    const timeoutWithDebounce = useCallback((wait: number) => {
        return () => {
            window.clearTimeout(timeout as number);
            const to = window.setTimeout(() => {
                setTimeout(null);
            }, wait);
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

    return <div
        className="weather-location-input"
        tabIndex={-1}
        onFocus={(e) => {
            if (e.currentTarget === e.target) {
                inputRef.current?.focus();
            }
        }}
        onBlur={e => {
            if (!e.currentTarget.contains(e.relatedTarget)) {
                setExpanded(false);
                setSelectedOption(null);
            }
        }}
    >
        <input
            tabIndex={0}
            className="weather-location-input__input"
            placeholder="Enter a town, city or postcode"
            ref={ inputRef }
            { ...props }
            onFocus={() => {setExpanded(true)}}
            onInput={ timeoutWithDebounce(500) }
            onKeyUp={ (e) => {
                if (e.code === 'Escape') {
                    setExpanded(false);
                } else if (e.code === 'Enter' && selectedOption) {
                    setLocation(selectedOption.url);
                } else if (e.code === 'ArrowUp' && selectedOption) {
                    const currentIndex = locations.indexOf(selectedOption);
                    const newIndex = currentIndex === 0 ? locations.length - 1 : currentIndex - 1;
                    const newSelected = locations[newIndex];
                    setSelectedOption(newSelected);
                } else if (e.code === 'ArrowDown' && selectedOption) {
                    const currentIndex = locations.indexOf(selectedOption);
                    const newIndex = currentIndex === locations.length - 1 ? 0 : currentIndex + 1;
                    const newSelected = locations[newIndex];
                    setSelectedOption(newSelected);
                } else if (e.code === 'ArrowUp') {
                    const newSelected = locations[locations.length - 1];
                    setSelectedOption(newSelected);
                } else if (e.code === 'ArrowDown') {
                    const newSelected = locations[0];
                    setSelectedOption(newSelected);
                }
            }}
        />
        <MaterialSymbolsIcon className="weather-location-input__icon" icon="search"/>
        <WeatherLocationInputOptions setLocation={ setLocation } locations={ locations } expanded={ expanded } selectedOption={ selectedOption } />
    </div>;
}