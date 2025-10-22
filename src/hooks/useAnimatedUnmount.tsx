import { useState, useEffect, useRef } from 'react';

export function useAnimatedUnmount(initVisible: boolean, className: string) {
    const [visible, setVisible] = useState(initVisible);
    const animatedElementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleAnimationEnd() {
            elementRef?.remove();
        }

        const elementRef = animatedElementRef.current;
        if (!visible && elementRef) {
            elementRef.classList.add(className);
            elementRef.addEventListener('animationend', handleAnimationEnd);
        }
    }, [visible]);

    return {
        setVisible,
        animatedElementRef
    };
}