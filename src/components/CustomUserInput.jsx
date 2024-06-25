import React, { useState } from "react";
import { useTypingContext } from "../context/TextProvider";
import { convertToSeconds } from "../utils/helper";
import toast from "react-hot-toast";

const CustomUserInput = () => {
  const {
    toggleVisibility,
    selectedOptions,
    keyEnable,
    visibility,
    setSelectedOptions,
    setCustomWords,
    countRef,
  } = useTypingContext();

  const [userInput, setUserInput] = useState("");

  const getUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleCustomUserInput = () => {
    setCustomWords(userInput);
    toggleVisibility("custom");
    keyEnable.current = true;
  };

  if (visibility.custom) {
    return (
      <div className="flex justify-center flex-col items-center ">
        <textarea
          maxLength="3000"
          className="resize-none w-[90%] my-10 h-[60vh] customarea p-4"
          placeholder="Paste here... or Type your text "
          onChange={getUserInput}
        ></textarea>
        <button className="utils-btn" onClick={() => handleCustomUserInput()}>
          <span className="text-[1.2rem]">ok</span>{" "}
        </button>
      </div>
    );
  }

  const getCustomInput = (e) => {
    const inputValue = e.target.value;
    const newInput = convertToSeconds(inputValue);
    // console.log(newInput);
    setUserInput(newInput);
  };

  const setCustomInput = () => {
    toggleVisibility("customWordsAndTime");
    keyEnable.current = true;
    countRef.current = parseInt(userInput) - 50;

    if (selectedOptions.words) {
      const isValidWordInput =
        /^\d+$/.test(userInput) && parseInt(userInput) > 0;
      if (!isValidWordInput) {
        toast("Please enter a valid number words.");
        return;
      }
    }

    if (selectedOptions.time) {
      if (userInput <= 0) {
        toast("Please enter a valid time");
        return;
      }
      const isValidTimeInput = /^(\d+h\d*m?|\d+m|\d+h|\d+)$/.test(userInput);
      if (!isValidTimeInput) {
        toast(
          "Please enter a valid time format (e.g., 2h, 2m, 2h30m) or a number of seconds."
        );
        return;
      }
    }

    setSelectedOptions({
      ...selectedOptions,
      duration15: false,
      duration30: false,
      duration60: false,
      duration100: false,
      count10: false,
      count25: false,
      count50: false,
      count100: false,
      custom: userInput,
    });
  };

  return (
    <div className="flex flex-col justify-center items-center h-[70vh]">
      {selectedOptions.time ? (
        <section className="flex flex-col items-center gap-5 p-12 customarea ">
          <h2>Test Duration</h2>
          <input
            autoComplete="off"
            placeholder="type here..."
            type="text"
            id="customInput"
            onChange={getCustomInput}
          />
          <p>
            You can use "h" for hours and "m" for minutes, for example "1h30m"
          </p>
          <p> or just number for seconds</p>
          <p>max limit 3h</p>
          <button
            className="utils-btn"
            onClick={() => {
              setCustomInput();
            }}
          >
            ok
          </button>
        </section>
      ) : (
        <section className="flex flex-col items-center gap-5 p-12 customarea ">
          <h2>Custom Word amount</h2>
          <input
            autoComplete="off"
            type="text"
            placeholder="type here..."
            id="customInput"
            onChange={getCustomInput}
          />
          <p>max limit 4000</p>
          <button
            className="utils-btn"
            onClick={() => {
              setCustomInput();
            }}
          >
            ok
          </button>
        </section>
      )}
    </div>
  );
};

export default CustomUserInput;
