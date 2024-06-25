import { FaScrewdriverWrench } from "react-icons/fa6";
import { useTypingContext } from "../context/TextProvider";
import { FaHashtag } from "react-icons/fa6";
import { MdTextFields } from "react-icons/md";
import { FaClock } from "react-icons/fa";
import { FaWrench } from "react-icons/fa";
import { FaPeace } from "react-icons/fa";
import { FaAt } from "react-icons/fa";
import { BiFont } from "react-icons/bi";
import { useEffect, useRef } from "react";
import { FaCog } from "react-icons/fa";

const MobileNavbar = ({
  restart,
  handleCustomUserInput,
  getButtonStyle,
  handlePreference,
  handleOptionClick,
  showOptions,
  setShowOptions
}) => {
  const { selectedOptions } = useTypingContext();
  const optionRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (optionRef.current && !optionRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    };

    if (showOptions) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    restart()
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showOptions, setShowOptions]);

  return (
    <>
      {showOptions ? (
        <div
          ref={optionRef}
          className={`flex flex-col gap-4 justify-between items-center p-[1rem] text-[0.83em] font-[500] bg-sub transition-opacity duration-300 rounded-[0.5rem] w-[100%] max-w-[300px] max-h-[100%] box-shadow ${showOptions ? "opacity-100" : "opacity-0"
            }`}
        >
          {/* first part */}
          <section className="flex flex-col">
            <button
              onClick={() => handleOptionClick("text")}
              style={getButtonStyle(selectedOptions.text)}
              className="button "
            >
              <MdTextFields />
              text
            </button>
            <button
              onClick={() => handleOptionClick("characters")}
              style={getButtonStyle(selectedOptions.characters)}
              className="button "
            >
              <FaAt />
              characters
            </button>
            <button
              onClick={() => handleOptionClick("num")}
              style={getButtonStyle(selectedOptions.num)}
              className="button"
            >
              <FaHashtag />
              numbers
            </button>
          </section>

          <span className="h-[0.25rem] w-[100%] bg-main "></span>

          {/* second part */}
          <section className="flex flex-col">
            <button
              onClick={() => handleOptionClick("time")}
              style={getButtonStyle(selectedOptions.time)}
              className="button"
            >
              <FaClock />
              time
            </button>
            <button
              onClick={() => handleOptionClick("words")}
              style={getButtonStyle(selectedOptions.words)}
              className="button"
            >
              <BiFont /> words
            </button>
            <button
              onClick={() => handleOptionClick("zen")}
              style={getButtonStyle(selectedOptions.zen)}
              className="button"
            >
              <FaPeace />
              zen
            </button>
            <button
              onClick={() => handleCustomUserInput("custom")}
              style={getButtonStyle(selectedOptions.custom)}
              className="button"
            >
              <FaWrench /> custom
            </button>
          </section>

          <span className="h-[0.25rem] w-[100%] bg-main "></span>

          {selectedOptions.words ? (
            <section className="flex flex-col">
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
                className="button"
              >
                <FaScrewdriverWrench />
              </button>
            </section>
          ) : (
            <section className="flex lg:gap-2 flex-col">
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
                className="button"
              >
                100
              </button>
              <button
                onClick={() => handleCustomUserInput("time")}
                className="button"
              >
                <FaScrewdriverWrench />
              </button>
            </section>
          )}
        </div>
      ) : (
        <div >
          <button onClick={() => setShowOptions(true)} className=" flex items-center justify-center optiontest-settings-btn gap-[0.6em]">

            <FaCog  />
            <span >Test Settings</span>
          </button>
        </div>
      )}
    </>
  );
};

export default MobileNavbar;
