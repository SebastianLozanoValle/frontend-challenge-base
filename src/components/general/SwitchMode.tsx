"use client"
import { useState, useEffect } from 'react';
import { FaMoon, FaSun } from "react-icons/fa6";
import styles from '../../styles/SwitchMode.module.css'

const SwitchMode: React.FC = () => {
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined' && window.matchMedia("(prefers-color-scheme: dark)").matches) {
            return "dark";
        }

        return "light";
    });

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', '');
        }
    }, [theme]);

    const handleChangeTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    return (
        <div>
            <button
                className={styles.boton}
                onClick={handleChangeTheme}
            >
                <FaMoon className={styles.moon} />
                <FaSun className={styles.sun} />
            </button>
        </div>
    );
};

export default SwitchMode;