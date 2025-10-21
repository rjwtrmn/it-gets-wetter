import { useEffect, useState } from "react";

export function useGeolocation() {
    const [ geolocation, setGeolocation ] = useState<string | null>(null);
    const [ isGeoPending, setIsGeoPending ] = useState<boolean>(true);
    const [ isError, setIsError ] = useState<boolean>(false);

    useEffect(() => {
        if (window.navigator?.geolocation) {
            const onSuccess: PositionCallback = ({ coords }) => {
                setGeolocation(coords.latitude + ',' + coords.longitude);
                setIsGeoPending(false);
            };
            const onError: PositionErrorCallback = () => {
                setIsGeoPending(false);
                setIsError(true);
            };
            window.navigator.geolocation.getCurrentPosition(onSuccess, onError, {
                enableHighAccuracy: false,
                timeout: 5000,
                maximumAge: Infinity,
            });
        } else {
            setIsGeoPending(false);
        }
    }, []);

    return [ geolocation, isGeoPending, isError ];
}