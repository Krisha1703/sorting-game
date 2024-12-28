import React, { useState, useEffect } from "react";
import "../../../app/global.css";
import { useRouter } from "next/router";
import { 
  LevelModal, 
  Lives, 
  Score, 
  BarsContainer, 
  LeftFixButtons, 
  PlayerClimb, 
  formatTime,
  generateBars, 
  handleFix,
  handleLeft,
  SuccessModal,
  FailureModal,
  PrincessTower
} from "@/components/InsertionSort/Levels/InsertionSortImports";

const InsertionSortLevelThree = () => {
  const router = useRouter();

  const [bars, setBars] = useState([]);
  const [currentCompare, setCurrentCompare] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(90);
  const [timerInterval, setTimerInterval] = useState(null);
  const [lives, setLives] = useState(3);
  const [errorState, setErrorState] = useState(false);
  const [flagPosition, setFlagPosition] = useState(0);
  const [isSorted, setIsSorted] = useState(false);
  const [playerClimbed, setPlayerClimbed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [score, setScore] = useState(0);
  const [shuffleInterval, setShuffleInterval] = useState(null); // Store shuffle interval

  const onGameOver = () => {
    stopTimer();
    setLives(0); // Ensure lives are set to zero for consistency
  };

  useEffect(() => {
    setBars(generateBars(6));
  }, []);

  const startTimer = () => {
    if (timerInterval) return; // Prevent starting multiple intervals
  
    const interval = setInterval(() => {
      setElapsedTime((prev) => {
        if (prev <= 1) {
          clearInterval(interval); // Stop timer when it reaches 0
          setTimerInterval(null);
          stopTimer();
          // Trigger failure modal
          setLives(0);
          return 0;
        }
        return prev - 1; // Decrement time
      });
    }, 1000);
    setTimerInterval(interval); // Store the interval ID to clear it later
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setElapsedTime(90);
    startTimer();
    startShuffle(); // Start shuffling bars
  };

  const stopTimer = () => {
    clearInterval(timerInterval);
    setTimerInterval(null);
  };

  const startShuffle = () => {
    const interval = setInterval(() => {
      setBars((prevBars) => {
        if (prevBars.length > 0) {
          const randomIndex = Math.floor(Math.random() * prevBars.length);
          const shuffledBars = [...prevBars];
          shuffledBars[randomIndex] = {
            ...shuffledBars[randomIndex],
            value: Math.floor(Math.random() * 100) + 30, // Randomize bar value
          };
          return shuffledBars;
        }
        return prevBars;
      });
    }, 10000); // Shuffle every 10 seconds
    setShuffleInterval(interval); // Store shuffle interval
  };

  const resetGame = () => {
    setLives(3);
    setIsSorted(false);
    setCurrentCompare(0);
    setElapsedTime(90);
    setPlayerClimbed(false);
    setFlagPosition(0);
    setBars(generateBars(6));
    setScore(0);
    setIsModalOpen(true);
  };

  return (
    <div
      className={`relative w-full h-screen bg-cover bg-center overflow-hidden ${
        errorState ? "animate-flicker border-4 border-red-600" : ""
      }`}
      style={{ backgroundImage: "url('/sort-levels-bg.png')" }}
    >
      {isModalOpen && <LevelModal src={"/bubblesort-level1-modal.png"} closeModal={closeModal} />}

      <div className="absolute top-0 left-0 w-full text-center text-red-600 font-bold text-2xl p-2">
        {formatTime(elapsedTime)}
      </div>

      <Lives lives={lives} level={3} />

      <Score score={score} />

      <PlayerClimb
        isSorted={isSorted}
        flagPosition={flagPosition}
        setFlagPosition={setFlagPosition}
        setPlayerClimbed={setPlayerClimbed}
      />

      <BarsContainer bars={bars} currentCompare={currentCompare} />

      <PrincessTower />

      <LeftFixButtons
        handleFix={() =>
          handleFix(
            bars,
            currentCompare,
            setBars,
            setIsSorted,
            setScore,
            setLives,
            setErrorState,
            setCurrentCompare,
            stopTimer,
            onGameOver
          )
        }
        handleLeft={() =>
          handleLeft(
            bars,
            currentCompare,
            setBars,
            setScore,
            setLives,
            setErrorState,
            setCurrentCompare,
            onGameOver
          )
        }
      />

      {lives === 0 && <FailureModal resetGame={resetGame} />}
      {isSorted && playerClimbed && lives > 0 && (
        <SuccessModal
          elapsedTime={elapsedTime}
          score={score}
          retryGame={resetGame}
          goToHome={() => router.push("/")}
          nextLevel={() => router.push("/InsertionSort/Level/3")}
        />
      )}
    </div>
  );
};

export default InsertionSortLevelThree;
