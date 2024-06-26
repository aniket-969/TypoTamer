import { useCallback, useState, useEffect, useRef } from "react";
import { isKeyboardCodeAllowed } from "../utils/helper";
import { useTypingContext } from "../context/TextProvider";
import { useUtilitiesContext } from "../context/UtilitiesProvider";

const useTypings = (enabled) => {
  const { keyEnable, mobileInput, setMobileInput } = useTypingContext();
  const { keySound, volume } = useUtilitiesContext();
  const [cursor, setCursor] = useState(0);
  const [typed, setTyped] = useState("");
  const totalTyped = useRef(0);
  const prevInputLength = useRef(0);

  const play = () => {
    if (keySound) {
      const audio = new Audio(keySound);
      audio.volume = volume;
      audio.playbackRate = 1.3;
      audio.play();
    }
  };

  const keydownHandler = useCallback(
    (e) => {
      const { key, code } = e;

      if (!enabled || !isKeyboardCodeAllowed(code) || !keyEnable.current) {
        return;
      }

      if (code === "Enter" || code === "Escape") {
        e.preventDefault();
        return;
      }
      if (code === "Space") {
        e.preventDefault();
      }

      switch (key) {
        case "Backspace":
          setTyped((prev) => prev.slice(0, -1));
          setCursor((cursor) => cursor - 1);
          totalTyped.current -= 1;
          break;

        default:
          play();
          setTyped((prev) => prev.concat(key));
          setCursor((cursor) => cursor + 1);
          totalTyped.current += 1;
      }
    },
    [enabled, keySound, volume]
  );

  const mobileInputHandler = useCallback(
    (mobileInput) => {
      if (!enabled || !keyEnable.current) {
        return;
      }
      const lastCharacter = mobileInput.slice(-1);
      if (mobileInput.length <= prevInputLength.current) {
        setTyped((prev) => prev.slice(0, -1));
        setCursor((cursor) => cursor - 1);
        totalTyped.current -= 1;
      } else if (lastCharacter === " ") {
        play();

        setTyped((prev) => prev.concat(lastCharacter));
        setCursor((cursor) => cursor + 1);
        totalTyped.current += 1;
      } else {
        play();
        setTyped((prev) => prev.concat(lastCharacter));
        setCursor((cursor) => cursor + 1);
        totalTyped.current += 1;
      }
      prevInputLength.current = mobileInput.length;
    },
    [enabled, keySound, volume, mobileInput]
  );

  useEffect(() => {
    mobileInputHandler(mobileInput);
  }, [mobileInputHandler]);

  const clearTyped = useCallback(() => {
    setTyped("");
    setCursor(0);
  }, []);

  const resetTotalTyped = useCallback(() => {
    totalTyped.current = 0;
  }, []);

  // useEffect(() => {
  //   window.addEventListener("keydown", keydownHandler);

  //   return () => {
  //     window.removeEventListener("keydown", keydownHandler);
  //   };
  // }, [keydownHandler]);

  return {
    typed,
    cursor,
    clearTyped,
    resetTotalTyped,
    totalTyped: totalTyped.current,
  };
};

export default useTypings;
