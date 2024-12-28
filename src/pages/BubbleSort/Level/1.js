import { useState, useEffect } from "react";
import "../../../app/globals.css";
import { useRouter } from "next/navigation";
import { 
  LevelModal, 
  Lives, 
  Score, 
  BarsContainer, 
  SwapButtons, 
  PlayerClimb, 
  formatTime,
  generateBars, 
  handleAction,
  SuccessModal,
  FailureModal,
  PrincessTower
} from "@/components/BubbleSort/Levels/BubbleSortImports";

const BubbleSortLevelOne = () => {
  const router = useRouter();

  const [bars, setBars] = useState([]);
  const [currentCompare, setCurrentCompare] = useState([0, 1]);
  const [isSorted, setIsSorted] = useState(false);
  const [error, setError] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0); // Timer in seconds
  const [timerInterval, setTimerInterval] = useState(null); // Store interval for clearing it
  const [lives, setLives] = useState(3); // Tracking lives
  const [flagPosition, setFlagPosition] = useState(0); // Track flag (player) position
  const [playerClimbed, setPlayerClimbed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [score, setScore] = useState(0); // Add a score state

  const closeModal = () => {
    setIsModalOpen(false);
    startTimer();
  };

  useEffect(() => {
    setBars(generateBars(6));
  }, []);

  const startTimer = () => {
    if (timerInterval) return; // Prevent starting multiple intervals

    const interval = setInterval(() => {
      setElapsedTime((prev) => prev + 1); // Increment the time every second
    }, 1000);
    setTimerInterval(interval); // Store the interval ID to clear it later
  };

  const stopTimer = () => {
    clearInterval(timerInterval);
    setTimerInterval(null);
  };

 formatTime(elapsedTime);

  const resetGame = () => {
    setLives(3);
    setIsSorted(false);
    setCurrentCompare([0, 1]);
    setElapsedTime(0);
    setPlayerClimbed(false);
    setFlagPosition(0);
    setBars(generateBars(6));
    setScore(0);
    setIsModalOpen(true); // Reopen the modal for retry
  };

  return (
    <div
      className={`relative w-full h-screen bg-cover bg-center overflow-hidden ${error ? "border-4 border-red-500 animate-pulse" : ""}`}
      style={{ backgroundImage: "url('/sort-levels-bg.png')" }}
    >
       {/* Modal */}
       {isModalOpen && <LevelModal src={"/bubblesort-level1-modal.png"} closeModal={() => closeModal()} />}

      {/* Timer display */}
      <div className="absolute top-0 left-0 w-full text-center text-red-600 font-bold text-2xl p-2">
        {formatTime(elapsedTime)}
      </div>

      {/* Display Lives */}
      <Lives lives={lives} level={1}/>

      {/* Display Score */}
      <Score score={score} />

     {/* Player Climbs */}
     <PlayerClimb
        isSorted={isSorted}
        flagPosition={flagPosition}
        setFlagPosition={setFlagPosition}
        setPlayerClimbed={setPlayerClimbed}
      />

      {/* Bar container */}
      <BarsContainer bars={bars} isSorted={isSorted} />

      {/* Princess Tower */}
      <PrincessTower />

      {/* Swap and Don't Swap buttons */}
      <SwapButtons
        handleAction={(action) => handleAction(action, bars, currentCompare, setBars, isSorted, setIsSorted, setScore, setLives, setError, setCurrentCompare, stopTimer)}
      />


    {/* Completion screen */}
    {(lives === 0 || (bars.length > 0 && bars.every(bar => bar.grayscale === 1))) && (
      <FailureModal resetGame={resetGame} />
    )}

    {/* Completion screen for success (when sorted) */}
    {isSorted && playerClimbed && lives > 0 && (
      <SuccessModal
        elapsedTime={elapsedTime}
        score={score}
        retryGame={resetGame}
        goToHome={() => router.push("/")}
        nextLevel={() => router.push("/BubbleSort/Level/2")}
      />
    )}

    </div>
  );
};

export default BubbleSortLevelOne;
