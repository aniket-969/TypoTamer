import Navbar from "../components/Navbar";
import Typing from "../components/Typing";
import OptionSelector from "../components/OptionSelector";
import useEngine from "../hooks/useEngine";
import Results from "../components/Results";
import { calculateAccuracyPercentage } from "../utils/helper";
import CountedownTimer from "../components/CountedownTimer";
import { useEffect, useRef, useState } from "react";
import Leaderboard from "../components/Leaderboard";
import { useTypingContext } from "../context/TextProvider";
import Settings from "../components/Settings";
import Zen from "../components/Zen";
import CustomUserInput from "../components/CustomUserInput";
import { useUtilitiesContext } from "../context/UtilitiesProvider";
import About from "../components/About";
import { VscDebugRestart } from "react-icons/vsc";
import MobileInput from "../components/MobileInput";
import DonateModal from "../components/DonateModal";

const Home = () => {
  const {
    typingTexts,
    typed,
    timeLeft,
    errors,
    restart,
    totalTyped,
    state,
    typingSpeed,
    time,
  } = useEngine();
  const {
    visibility,
    setTypingProfile,
    mobileInput,
    setMobileInput,
    mobileInputVisible,
    setMobileInputVisible,
  } = useTypingContext();
  const { fontSize, resetButton } = useUtilitiesContext();
  const scrollRef = useRef(null);
  const [showOptions, setShowOptions] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setTypingProfile(false);
  }, []);

  useEffect(() => {
    restart();
  }, [visibility]);

  useEffect(() => {
    if (state === "run" && mobileInput === "") {
      setMobileInput(typed);
    }
  }, [mobileInput]);

  const handleInput = (e) => {
    setMobileInput(e.target.value);
  };

  return (
    <div
      className={` pb-2 sm:px-5 px-2 pt-6 ${
        visibility.settings || visibility.about
          ? ""
          : "h-screen overflow-hidden"
      } `}
    >
      <Navbar />
      {visibility.leaderboard && <Leaderboard />}
      {visibility.settings && <Settings />}
      {visibility.zen && <Zen />}
      {visibility.about && <About />}
      {(visibility.custom || visibility.customWordsAndTime) && (
        <CustomUserInput />
      )}
      {!visibility.leaderboard &&
        !visibility.settings &&
        !visibility.zen &&
        !visibility.custom &&
        !visibility.customWordsAndTime &&
        !visibility.about && (
          <main
            className={`flex flex-col m-4 h-[84vh] py-5 px-2 items-center sm:gap-8 gap-4`}
          >
            <OptionSelector
              showOptions={showOptions}
              setShowOptions={setShowOptions}
              restart={restart}
              mobileInputVisible={mobileInputVisible}
            />
            <CountedownTimer
              setShowOptions={setShowOptions}
              showOptions={showOptions}
              timeLeft={timeLeft}
            />
            <div
              ref={scrollRef}
              className={`relative [word-spacing:6px]  w-[100%] overflow-hidden flex items-center justify-center max-w-[1280px] ${
                showOptions ? "hidden" : "visible"
              } ${mobileInputVisible ? "mt-0" : "mt-5"} `}
              style={{
                fontSize: fontSize.size,
                lineHeight: fontSize.lineheight,
                height: fontSize.height,
              }}
            >
              <Typing
                userInput={typed}
                words={typingTexts}
                scrollRef={scrollRef}
                showOptions={showOptions}
                restart={restart}
                scroll={fontSize.scroll}
              />
            </div>
            <MobileInput
              handleInput={handleInput}
              mobileInput={mobileInput}
              mobileInputVisible={mobileInputVisible}
              setMobileInputVisible={setMobileInputVisible}
              restart={restart}
              state={state}
            />
            <VscDebugRestart
              className={`text-[1.2rem] restart ${
                mobileInputVisible ? "hidden" : ""
              }`}
              onClick={() => restart()}
            />
            <Results
              state={state}
              errors={errors}
              accuracyPercentage={calculateAccuracyPercentage(
                errors,
                totalTyped
              )}
              time={time}
              typingSpeed={typingSpeed.current}
              total={totalTyped}
            />
            {/* Buy me a coffee */}
            {state !== "finish" ? <DonateModal /> : <></>}

            {resetButton != "off" && state !== "finish" ? (
              <p
                className={`text-sub absolute bottom-5 ${
                  mobileInputVisible ? "hidden" : ""
                }`}
              >
                {" "}
                use{" "}
                <span className="bg-submain text-bg text-[0.8rem] px-[0.2rem]">
                  {resetButton}
                </span>{" "}
                to quick restart test
              </p>
            ) : (
              <></>
            )}
          </main>
        )}
    </div>
  );
};

export default Home;
