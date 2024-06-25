export const isKeyboardCodeAllowed = (code) => {
 
  return (
    code.startsWith("Key") ||
    code.startsWith("Digit") ||
    code === "Backspace" ||
    code === "Space" ||
    /#$@%^&()/.test(code) ||
    code === "BracketLeft" ||
    code === "BracketRight" ||
    code === "BracketLeft" ||
    code === "BracketRight" ||
    code === "Backslash" ||
    code === "Semicolon" ||
    code === "Colon" ||
    code === "Comma" ||
    code === "Period" ||
    code === "LessThan" ||
    code === "GreaterThan" ||
    code === "Slash" ||
    code === "QuestionMark" ||
    code === "Backquote" ||
    code === "Quote" ||
    code === "Equal"
  );
};

export const countErrors = (actual, expected) => {
  const expectedCharacters = expected.split("");

  return expectedCharacters.reduce((errors, expectedChar, i) => {
    const actualChar = actual[i];
    if (actualChar !== expectedChar) {
      errors++;
    }
    return errors;
  }, 0);
};
  
export const calculateAccuracyPercentage = (errors, total) => {
  if (total > 0) {
    const corrects = total - errors;
   
    return (corrects / total) * 100;
  }

  return 0;
};

export const formatPercentage = (percentage) => {
  return percentage.toFixed(0) + "%";
};

export const wpm = (totalTyped,time) =>{
  if(time == 0){
    return 0
  }
 
    const wordCount = totalTyped/5
    return Math.round(wordCount/(time/60))
}

export const normalize = (value, min, max) => {
  if (max === min) return 0; // avoid division by zero
  return (value - min) / (max - min);
};

export const computeScore = (normalizedCount, normalizedRatio) => {
  const countWeight = 0.4; // example weights
  const ratioWeight = 0.6;
  return normalizedCount * countWeight + normalizedRatio * ratioWeight;
};

export function cleanInput(input) {
  
  let cleaned = input.trim();

  // Replace multiple spaces with a single space
  cleaned = cleaned.split(/\s+/).join(' ');

  return cleaned;
}

export function formatISODateTime(isoString) {
  const dateObj = new Date(isoString);

  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = dateObj.toLocaleString('en-US', { month: 'short' });
  const year = dateObj.getFullYear();
  
  const hours = String(dateObj.getHours()).padStart(2, '0');
  const minutes = String(dateObj.getMinutes()).padStart(2, '0');

  const formattedDate = `${day} ${month} ${year}`;
  const formattedTime = `${hours}:${minutes}`;

  return { formattedDate, formattedTime };
}

export const convertToSeconds = (input) => {
  const timePattern = /(\d+h)?(\d+m)?(\d+)?/;
  const match = input.match(timePattern);
  if (!match) return 0;

  let totalSeconds = 0;
  if (match[1]) {
    totalSeconds += parseInt(match[1]) * 3600; // Convert hours to seconds
  }
  if (match[2]) {
    totalSeconds += parseInt(match[2]) * 60; // Convert minutes to seconds
  }
  if (match[3]) {
    totalSeconds += parseInt(match[3]); // Add remaining seconds
  }


  return totalSeconds;
};