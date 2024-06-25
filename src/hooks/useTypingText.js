import { useCallback, useState } from "react";
import { generateWords, generateMajorityElement } from "typetextsgenerator";
import { useTypingContext } from "../context/TextProvider.jsx";
import { cleanInput } from "../utils/helper.js";

const useTypingText = (countAny) => {
  const count = parseInt(countAny, 10);
 
  const {
    selectedOptions,
    typingProfile,
    typingelement,
    customWords,
    countRef
  } = useTypingContext();
 
  const { text, characters, num } = selectedOptions;

  const generateTypingText = (count, isUpdate = false) => {
    
    if (selectedOptions.custom != 0 && isUpdate) {
      if (countRef.current > 0 && countRef.current < 50) {
        count = countRef.current;
        countRef.current -= 50;
      } else {
        count = 50;
        countRef.current -= 50;
      }
    }
    const cleanedInput = cleanInput(customWords);
    if (cleanedInput != "") {
      
      return cleanedInput;
    }

    if (typingProfile) {
      return generateMajorityElement(typingelement, count);
    }

    return generateWords(num, false, characters, text, count);
  };

  const [typingTexts, setTypingTexts] = useState(generateTypingText(count));

  const updateTypingText = useCallback(
    (isUpdate = false) => {
      setTypingTexts(generateTypingText(count, isUpdate));
    },
    [generateTypingText]
  );

  return { typingTexts, updateTypingText };
};

export default useTypingText;
