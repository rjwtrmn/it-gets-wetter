import './darkModeToggle.scss';
import { useEffect, useState } from "react";

export function DarkModeToggle() {
    const [ isStoredDarkModeOn, setIsStoredDarkModeOn ] = useState(
        window.localStorage.getItem('it-gets-wetter-dark-mode-on') === 'true',
    );

    const isDarkModeOn = isStoredDarkModeOn ?? window.matchMedia('(prefers-color-scheme: dark)').matches;
    const [ value, setValue ] = useState<boolean>(isDarkModeOn);

    useEffect(() => {
        if (isStoredDarkModeOn !== value) {
            localStorage.setItem('it-gets-wetter-dark-mode-on', JSON.stringify(value));
            setIsStoredDarkModeOn(value);
        }
        document.querySelector('html')!.style.colorScheme = value ? 'dark' : 'light';
    }, [value]);

    return <label className="dark-mode-toggle">
        <span className="dark-model-toggle__text">{ value ? 'Light mode?' : 'Dark mode?' }</span>
        <div className="dark-model-toggle__switch">
            <input
                className="dark-model-toggle__switch__input"
                name="dark-mode-toggle"
                value={value.toString()}
                type="checkbox"
                onInput={() => { setValue(!value); }}
            />
            <span className="dark-model-toggle__switch__slider"></span>
        </div>
    </label>;
}