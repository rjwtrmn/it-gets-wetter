import { useEffect } from "react";
import { useAnimatedUnmount } from "../../hooks/useAnimatedUnmount.tsx";
import './loaderOverlay.scss';
import { Loader } from "../loader/loader.tsx";

export function LoaderOverlay({ visible }: { visible: boolean }) {
    const { setVisible, animatedElementRef } = useAnimatedUnmount(visible, 'fade-out');

    useEffect(() => {
        setVisible(visible);
    }, [ visible ]);

    return <div ref={ animatedElementRef } className="loader-overlay">
        <span>Loading...</span>
        <Loader/>
    </div>;
}