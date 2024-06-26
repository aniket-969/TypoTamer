import { useEffect, useState, useCallback, useRef } from "react";
import { useTypingContext } from "../context/TextProvider";
import useCountdown from "./useCountdown";
import useTypingText from "./useTypingText";

import useTypings from "./useTyping";
import { cleanInput, countErrors, wpm } from "../utils/helper";
import { updateErrorRatios } from "../services/firebase/TypingErrors";
import { useUserContext } from "../context/AuthProvider";
import { useUtilitiesContext } from "../context/UtilitiesProvider";

const useEngine = () => {
  const storedErrors = useRef([]);
  const typingSpeed = useRef(0);
  const { resetButton, caret } = useUtilitiesContext();

  let {
    selectedOptions,
    state,
    setState,
    typingProfile,
    typingelement,
    setCaretPosition,
    customWords,
    setCustomWords,
    countRef,
    keyEnable,
    setScrollFlag,
    mobileInput,
    setMobileInput,
  } = useTypingContext();
  const { User, isAnonymous } = useUserContext();

  let countdownSeconds = 0;
  let countWords = 0;

  const cleanedInput = cleanInput(customWords);
  if (cleanedInput != "") {
    countdownSeconds = 3600;
    countWords = cleanedInput.length;
  } else if (typingProfile) {
    countdownSeconds = 3600;
    countWords = 100;
  } else {
    countdownSeconds = Object.keys(selectedOptions).find(
      (key) => key.startsWith("duration") && selectedOptions[key]
    );

    countWords = Object.keys(selectedOptions).find(
      (key) => key.startsWith("count") && selectedOptions[key]
    );

    if (selectedOptions.custom != 0) {
      if (selectedOptions.time) {
        countdownSeconds = selectedOptions.custom;
        if (countdownSeconds > 10800) {
          countdownSeconds = 10800;
        }

        countWords = 400;
      } else {
        countWords = selectedOptions.custom;
        if (countWords > 4000) {
          countWords = 4000;
        }
        if (countWords > 50) {
          countWords = 50;
        }

        countdownSeconds = 86400;
      }
    } else {
      if (countdownSeconds) {
        countWords = 200;
        switch (countdownSeconds) {
          case "duration15":
            countdownSeconds = 15;
            break;
          case "duration30":
            countdownSeconds = 30;
            break;
          case "duration60":
            countdownSeconds = 60;
            break;
          case "duration100":
            countdownSeconds = 100;
            break;
        }
      } else if (countWords) {
        countdownSeconds = 86400;
        switch (countWords) {
          case "count10":
            countWords = 10;
            break;
          case "count25":
            countWords = 25;
            break;
          case "count50":
            countWords = 50;
            break;
          case "count100":
            countWords = 100;
            break;
        }
      }
    }
  }

  const { timeLeft, startCountdown, resetCountdown } =
    useCountdown(countdownSeconds);

  const { typingTexts, updateTypingText } = useTypingText(countWords);
  const { cursor, typed, clearTyped, totalTyped, resetTotalTyped } = useTypings(
    state !== "finish"
  );
  const [wordsReached, setWordsReached] = useState("");
  const [errors, setErrors] = useState(0);

  const isStarting = state === "start" && cursor > 0;

  const areWordsFinished = cursor === typingTexts.length;

  const restart = useCallback(() => {
    if (caret.current != 0) {
      setCaretPosition({ left: 0, top: caret.current });
    }
    if (cleanedInput != "") {
      setScrollFlag((prev) => !prev);
    }
    resetCountdown();
    resetTotalTyped();
    setState("start");
    setErrors(0);
    updateTypingText();
    clearTyped();
    storedErrors.current = [];
    setWordsReached("");
    typingSpeed.current = 0;
    countRef.current = selectedOptions.custom - 50;
    setMobileInput("");
  }, [clearTyped, updateTypingText]);

  const sumErrors = useCallback(() => {
    const wordsReached = typingTexts.substring(
      0,
      Math.min(cursor, typingTexts.length)
    );

    setErrors((prevErrors) => prevErrors + countErrors(typed, wordsReached));
  }, [typed, typingTexts, cursor]);

  const handleGlobalKeyDown = useCallback(
    (e) => {
      if (e.key === resetButton && keyEnable.current) {
        restart();
      }
    },
    [resetButton, restart]
  );

  const storeErrors = useCallback(() => {
    setWordsReached(
      typingTexts.substring(0, Math.min(cursor, typingTexts.length))
    );
    const expectedChar = wordsReached.split("");
    expectedChar.forEach((expectedChar, i) => {
      const actualChar = typed[i];
      if (actualChar !== expectedChar && expectedChar !== " ") {
        const error = { char: expectedChar, index: i };

        if (
          !storedErrors.current.some(
            (e) => e.char === error.char && e.index === error.index
          )
        ) {
          storedErrors.current.push(error);
        }
      }
    });
  }, [typed]);

  useEffect(() => {
    if (!typingProfile) {
      storeErrors();
    }
  }, [typed]);

  useEffect(() => {
    if (isStarting) {
      setState("run");
      startCountdown();
    }
  }, [isStarting]);

  useEffect(() => {
    if (!timeLeft && state === "run") {
      if (!typingProfile) {
        updateErrorRatios(wordsReached, storedErrors, User, isAnonymous);
        typingSpeed.current = wpm(totalTyped, countdownSeconds);
        sumErrors();
      }
      setMobileInput("");
      setState("finish");
    }
  }, [timeLeft, state]);

  useEffect(() => {
    if (areWordsFinished) {
      if (selectedOptions.custom != 0) {
        if (countRef.current > 0) {
          updateTypingText(true);
          clearTyped();
          sumErrors();
        } else {
          updateErrorRatios(wordsReached, storedErrors, User, isAnonymous);
          setState("finish");
          typingSpeed.current = wpm(totalTyped, 86400 - timeLeft);
          sumErrors();
          resetCountdown();
          clearTyped();
          countRef.current = selectedOptions.custom - 50;
          setMobileInput("");
        }
      } else if (cleanedInput != "") {
        clearTyped();
        setState("finish");
        setMobileInput("");
        typingSpeed.current = wpm(totalTyped, 3600 - timeLeft);
        sumErrors();
        resetCountdown();
        updateErrorRatios(wordsReached, storedErrors, User, isAnonymous);
      } else if (typingProfile) {
        updateTypingText();
        clearTyped();
      } else {
        if (selectedOptions.words) {
          updateErrorRatios(wordsReached, storedErrors, User, isAnonymous);
          setState("finish");
          typingSpeed.current = wpm(totalTyped, 86400 - timeLeft);
          sumErrors();
          resetCountdown();
          clearTyped();
          setMobileInput("");
        } else {
          updateTypingText();
          clearTyped();
          sumErrors();
        }
      }

      setCaretPosition({ left: 0, top: caret.current });
    }
  }, [areWordsFinished]);

  useEffect(() => {
    resetCountdown();
    resetTotalTyped();
    setState("start");
    setErrors(0);
    updateTypingText();
    clearTyped();
    storedErrors.current = [];
    setWordsReached("");
    typingSpeed.current = 0;
    setCustomWords("");
    countRef.current = 5;
    setMobileInput("");
  }, [selectedOptions, typingelement]);

  useEffect(() => {
    updateTypingText();
  }, [customWords, typingProfile]);

  useEffect(() => {
    window.addEventListener("keydown", handleGlobalKeyDown);

    return () => {
      window.removeEventListener("keydown", handleGlobalKeyDown);
    };
  }, [resetButton, handleGlobalKeyDown]);

  return {
    typingTexts,
    typed,
    errors,
    restart,
    timeLeft,
    totalTyped,
    state,
    storedErrors,
    typingSpeed,
    time: countdownSeconds,
    User,
    countRef,
  };
};

export default useEngine;
