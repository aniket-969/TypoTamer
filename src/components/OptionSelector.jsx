import { FaScrewdriverWrench } from "react-icons/fa6";
import { useTypingContext } from "../context/TextProvider";
import { FaHashtag } from "react-icons/fa6";
import { MdTextFields } from "react-icons/md";
import { FaClock } from "react-icons/fa";
import { FaWrench } from "react-icons/fa";
import { FaPeace } from "react-icons/fa";
import { FaAt } from "react-icons/fa";
import { FaFont } from "react-icons/fa";
import MobileNavbar from "./MobileNavbar";

const OptionSelector = ({ restart, showOptions, setShowOptions,mobileInputVisible }) => {
    const { selectedOptions, setSelectedOptions, keyEnable, toggleVisibility, setCustomWords } = useTypingContext();
    
    const handleOptionClick = (option) => {
        setCustomWords(" ");
        document.activeElement.blur();

        if (option === "time") {
            restart();
            if (!selectedOptions.time) {
                setSelectedOptions({
                    ...selectedOptions,
                    time: true,
                    words: false,
                    duration30: true,
                    count10: false,
                    count25: false,
                    count50: false,
                    count100: false,
                    custom: 0
                });
            }
        } else if (option === "words") {
            restart();
            if (!selectedOptions.words) {
                setSelectedOptions({
                    ...selectedOptions,
                    words: true,
                    time: false,
                    count25: true,
                    duration15: false,
                    duration30: false,
                    duration60: false,
                    duration100: false,
                    custom: 0
                });
            }
        } else {
            setSelectedOptions({
                ...selectedOptions,
                [option]: !selectedOptions[option],
            });
        }

        if (option === "zen") {
            keyEnable.current = false;
            toggleVisibility("zen");
        }
    };

    const handlePreference = (option) => {
        document.activeElement.blur();

        if (selectedOptions.words) {
            const updatedOptions = { ...selectedOptions, [option]: true, custom: 0 };
            Object.keys(selectedOptions).forEach((key) => {
                if (key.startsWith("count") && key !== option) {
                    updatedOptions[key] = false;
                }
            });
            setSelectedOptions(updatedOptions);
        } else {
            const updatedOptions = { ...selectedOptions, [option]: true, custom: 0 };
            Object.keys(selectedOptions).forEach((key) => {
                if (key.startsWith("duration") && key !== option) {
                    updatedOptions[key] = false;
                }
            });
            setSelectedOptions(updatedOptions);
        }
    };

    const handleCustomUserInput = (option) => {
        if (option === "custom") {
            toggleVisibility("custom");
        } else {
            toggleVisibility("customWordsAndTime");
        }
        keyEnable.current = false;
    };

    const getButtonStyle = (isSelected) => ({
        color: isSelected ? "var(--main-color)" : "var(--sub-color)",
    });

    return (
        <>

            <section className=" hidden sm:flex justify-center w-[100%] ">

                <div className=" flex gap-2 justify-between items-center md:text-[0.83em] text-[0.72em] sm:max-w-[100%] md:max-w-[750px] lg:max-w-[850px] xl:max-w-[930px] font-[500] bg-sub rounded-md px-2 hide">

                    {/* first part */}
                    <div className="flex ">
                        <button
                            onClick={() => handleOptionClick("text")}
                            style={getButtonStyle(selectedOptions.text)}
                            className="button "
                        > <MdTextFields />text
                        </button>
                        <button
                            onClick={() => handleOptionClick("characters")}
                            style={getButtonStyle(selectedOptions.characters)}
                            className="button "
                        ><FaAt />
                            characters
                        </button>
                        <button
                            onClick={() => handleOptionClick("num")}
                            style={getButtonStyle(selectedOptions.num)}
                            className="button"
                        ><FaHashtag />
                            numbers
                        </button>
                    </div>

                    <span className="h-[20px] w-[0.25rem] bg-main "></span>

                    {/* second */}
                    <div className="flex">
                        <button
                            onClick={() => handleOptionClick("time")}
                            style={getButtonStyle(selectedOptions.time)}
                            className="button"
                        ><FaClock />
                            time
                        </button>
                        <button
                            onClick={() => handleOptionClick("words")}
                            style={getButtonStyle(selectedOptions.words)}
                            className="button"
                        ><FaFont /> words
                        </button>
                        <button
                            onClick={() => handleOptionClick("zen")}
                            style={{ color: "var(--sub-color)" }} className="button"
                        ><FaPeace />
                            zen
                        </button>
                        <button onClick={() => handleCustomUserInput("custom")} style={getButtonStyle(selectedOptions.custom)} className="button">
                            <FaWrench /> custom
                        </button>
                    </div>

                    <span className="h-[20px] w-[0.25rem] bg-main "></span>

                    {selectedOptions.words ? (
                        <div className="flex ">
                            <button
                                onClick={() => handlePreference("count10")}
                                style={getButtonStyle(selectedOptions.count10)}
                                className="button"
                            >
                                10
                            </button>
                            <button
                                onClick={() => handlePreference("count25")}
                                style={getButtonStyle(selectedOptions.count25)}
                                className="button"
                            >
                                25
                            </button>
                            <button
                                onClick={() => handlePreference("count50")}
                                style={getButtonStyle(selectedOptions.count50)}
                                className="button"
                            >
                                50
                            </button>
                            <button
                                onClick={() => handlePreference("count100")}
                                style={getButtonStyle(selectedOptions.count100)}
                                className="button"
                            >
                                100
                            </button>
                            <button
                                onClick={() => handleCustomUserInput("words")}
                                className="button "
                            >
                                <FaScrewdriverWrench />
                            </button>
                        </div>
                    ) : (
                        <div className="flex lg:gap-2 ">
                            <button
                                onClick={() => handlePreference("duration15")}
                                style={getButtonStyle(selectedOptions.duration15)}
                                className="button"
                            >
                                15
                            </button>
                            <button
                                onClick={() => handlePreference("duration30")}
                                style={getButtonStyle(selectedOptions.duration30)}
                                className="button"
                            >
                                30
                            </button>
                            <button
                                onClick={() => handlePreference("duration60")}
                                style={getButtonStyle(selectedOptions.duration60)}
                                className="button"
                            >
                                60
                            </button>
                            <button
                                onClick={() => handlePreference("duration100")}
                                style={getButtonStyle(selectedOptions.duration100)}
                                className="button "
                            >
                                100
                            </button>
                            <button
                                onClick={() => handleCustomUserInput("time")}
                                className="button"
                            >
                                <FaScrewdriverWrench />
                            </button>
                        </div>
                    )}

                </div>

            </section>

            <div className={`sm:hidden w-[100%] flex items-center justify-center ${mobileInputVisible?"hidden":""}`}>
                <MobileNavbar handleCustomUserInput={handleCustomUserInput} handlePreference={handlePreference} handleOptionClick={handleOptionClick} getButtonStyle={getButtonStyle} restart={restart} showOptions={showOptions} setShowOptions={setShowOptions} />
            </div>
        </>

    );
};

export default OptionSelector;
