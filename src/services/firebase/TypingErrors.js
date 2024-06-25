import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import { computeScore, normalize } from "../../utils/helper";

export const updateErrorRatios = async (
  wordsReached,
  storedErrors,
  User,
  isAnonymous
) => {
  if (isAnonymous) return;



  const userId = User.uid;

  const errorsCollection = collection(db, "Errors");

  const userDocRef = doc(errorsCollection, userId);

  const userDocSnapshot = await getDoc(userDocRef);

  if (!userDocSnapshot.exists()) {
    await setDoc(userDocRef, {});
  }

  for (const error of storedErrors.current) {
    const { char } = error;
if(char === ".") continue;
    const totalOccurrences = wordsReached
      .split("")
      .filter((c) => c === char).length;

    const typedOccurrences = storedErrors.current.filter(
      (e) => e.char === char
    ).length; 


    try {
      const characterDocRef = doc(errorsCollection, userId, "Characters", char);

      const characterDocSnapshot = await getDoc(characterDocRef);
      const characterData = characterDocSnapshot.data() || {
        count: 0,
        ratio: 0,
      };

      const newRatio = typedOccurrences / totalOccurrences;
      const newCount = characterData.count + 1;
      const updatedRatio =
        (characterData.ratio * characterData.count + newRatio) / newCount;

      await setDoc(
        characterDocRef,
        {
          count: newCount,
          ratio: updatedRatio,
        },
        { merge: true }
      );
    } catch (error) {
      // console.error("Error updating document: ", error);
      throw error
    }
  }

  
};

export const findAndSortCharactersByWeakness = async (userId) => {
  const charactersCollection = collection(db, "Errors", userId, "Characters");
  const charactersSnapshot = await getDocs(charactersCollection);
  const characterData = [];

  charactersSnapshot.forEach((charDoc) => {
    const data = charDoc.data();
    characterData.push({
      char: charDoc.id,
      count: data.count,
      ratio: data.ratio,
    });
  });

  if (characterData.length === 0) return [];

  const minCount = Math.min(...characterData.map((data) => data.count));
  const maxCount = Math.max(...characterData.map((data) => data.count));
  const minRatio = Math.min(...characterData.map((data) => data.ratio));
  const maxRatio = Math.max(...characterData.map((data) => data.ratio));

  // Calculate scores
  const characterScores = characterData.map((data) => {
    const normalizedCount = normalize(data.count, minCount, maxCount);
    const normalizedRatio = normalize(data.ratio, minRatio, maxRatio);
    const score = computeScore(normalizedCount, normalizedRatio);
    return { char: data.char, score };
  });

  // Sort characters by score in descending order (weakest first)
  const sortedCharacters = characterScores.sort((a, b) => b.score - a.score);

  return sortedCharacters;
};
