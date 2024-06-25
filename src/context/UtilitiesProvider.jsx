import { createContext, useState, useContext, useEffect, useRef } from "react";
import keyboard from "../../assets/keyboard.mp3";

const UtilitiesContext = createContext();

export const UtilitiesProvider = ({ children }) => {
    const [font, setFont] = useState(localStorage.getItem("font") || "Arial, sans-serif");
    const [keySound, setKeySound] = useState(localStorage.getItem("keySound") || keyboard);
    const [volume, setVolume] = useState(localStorage.getItem("volume") || 1);
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "serika dark");
    const [resetButton, setResetButton] = useState(localStorage.getItem("resetButton") || "Enter");
    const [fontSize, setFontSize] = useState(JSON.parse(localStorage.getItem("fontSize")) || {
        size: "1.875rem",
        lineheight: "2.5rem",
        height: "125px",
        scroll: 40
    });
    const caret = useRef(0)
    const [isLoading, setIsLoading] = useState(false)

    const handleReset = () => {
        // Set all preferences to their default values
        setFont("Arial, sans-serif");
        setKeySound(keyboard);
        setVolume(1);
        setFontSize({
            size: "1.5rem",
            lineheight: "2.25rem",
            height: "115px",
            scroll: 36,
        });
        setTheme("serika dark");

        setResetButton("Enter");
    };


    useEffect(() => {
        localStorage.setItem("font", font);
    }, [font]);

    useEffect(() => {

        localStorage.setItem("keySound", keySound);
    }, [keySound]);

    useEffect(() => {
        localStorage.setItem("volume", volume);
    }, [volume]);

    useEffect(() => {
        localStorage.setItem("resetButton", resetButton);
    }, [resetButton]);

    useEffect(() => {
        localStorage.setItem("fontSize", JSON.stringify(fontSize));
    }, [fontSize]);

    useEffect(() => {
        if (theme === "custom") {
            const storedTheme = localStorage.getItem('customTheme');
            if (storedTheme) {
                const parsedTheme = JSON.parse(storedTheme);

                Object.keys(parsedTheme).forEach(variableName => {
                    document.documentElement.style.setProperty(variableName, parsedTheme[variableName]);
                });
            }
        }
        else{
             document.documentElement.setAttribute("data-theme", theme);
        
        }
    
        localStorage.setItem("theme", theme);
    }, [theme])


    const value = {
        font,
        setFont,
        keySound,
        setKeySound,
        volume,
        setVolume,
        theme,
        setTheme,
        resetButton,
        setResetButton,
        fontSize,
        setFontSize,
        handleReset,
        isLoading,
        setIsLoading,caret
    };

    return (
        <UtilitiesContext.Provider value={value}>
            {children}
        </UtilitiesContext.Provider>
    );
};

export const useUtilitiesContext = () => useContext(UtilitiesContext);
