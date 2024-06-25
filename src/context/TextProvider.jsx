import { createContext, useState, useContext, useRef } from "react";

const TypeContext = createContext()

export const TextProvider = ({ children }) => {
    const keyEnable = useRef(true)
    const [selectedOptions, setSelectedOptions] = useState({
        text: true,
        characters: false,
        num: false,
        time: true,
        words: false,
        duration15: true,
        duration30: false,
        duration60: false,
        duration100: false,
        count10: false,
        count25: false,
        count50: false,
        count100: false,
        custom: 0
    })
    const [caretPosition, setCaretPosition] = useState({ left: 0, top:0});
    const [state, setState] = useState("start")
    const [visibility, setVisibility] = useState({
        leaderboard: false,
        settings: false,
        zen: false,
        about:false,
        custom: false,
        customWordsAndTime: false
    });
    const [typingProfile, setTypingProfile] = useState(false)
    const [customWords, setCustomWords] = useState("")
    const [typingelement, setTypingElement] = useState(" ")
    const toggleVisibility = (component) => {

        if (component === "home") {
            setVisibility((prev) => {
                const newVisibility = { leaderboard: false, settings: false, zen: false, custom: false, customWordsAndTime: false,about:false };
                return {
                    ...newVisibility,

                };
            });
            keyEnable.current = true
        }

        else {
 
            setVisibility((prev) => {
                const newVisibility = { leaderboard: false, settings: false, zen: false, custom: false, customWordsAndTime: false,about:false };
                return {
                    ...newVisibility,
                    [component]: !prev[component],
                };
            });
            keyEnable.current = false
        }
        
    };
const countRef = useRef(0)
const [scrollFlag,setScrollFlag] = useState(false)

    const value = { selectedOptions, setSelectedOptions, state, setState, keyEnable, visibility, toggleVisibility,setVisibility, typingProfile, setTypingProfile, typingelement, setTypingElement, caretPosition, setCaretPosition,customWords,setCustomWords,countRef,scrollFlag,setScrollFlag }
    return (
        <TypeContext.Provider value={value}>
            {children}
        </TypeContext.Provider>
    )
}

export const useTypingContext = () => useContext(TypeContext);