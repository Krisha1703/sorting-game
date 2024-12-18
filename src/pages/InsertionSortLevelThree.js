import React, { useState, useEffect } from "react";
import "../app/globals.css";
import Image from "next/image";
import { useRouter } from "next/router";

const InsertionSortLevelThree = () => {
  const router = useRouter();

  const [bars, setBars] = useState([]);
  const [currentCompare, setCurrentCompare] = useState(0); // Index of the current bar being compared
  const [elapsedTime, setElapsedTime] = useState(90); // Timer in seconds
  const [timerInterval, setTimerInterval] = useState(null); // Store interval for clearing it
  const [lives, setLives] = useState(3); // Tracking lives
  const [errorState, setErrorState] = useState(false); // To trigger screen flicker effect
  const [playerY, setPlayerY] = useState(0); // Initial Y position of the player
  const [swapCount, setSwapCount] = useState(0);
  const [flagPosition, setFlagPosition] = useState(0); // Track flag position
  const [isSorted, setIsSorted] = useState(false); // Flag to check if sorting is complete
  const [playerClimbed, setPLayerClimbed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);
       const [score, setScore] = useState(0); // Add a score state
       const [shuffleInterval, setShuffleInterval] = useState(null); // Store shuffle interval

  const closeModal = () => {
      setIsModalOpen(false);
      setElapsedTime(90); // Start with 45 seconds
      startTimer();
      startShuffle(); // Start shuffling bars
    };
  
    useEffect(() => {
      setBars(generateBars(6));
      setIsModalOpen(true);
    }, []);

  const generateBars = (count) =>
    Array.from({ length: count }, (_, index) => ({
      value: Math.floor(Math.random() * 100) + 30,
      grayscale: index === 0 ? 0 : 1,
      sorted: false,
    }));

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

    const stopTimer = () => {
      clearInterval(timerInterval);
      setTimerInterval(null);
    };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const triggerError = () => {
    setErrorState(true);
    setLives((prev) => prev - 1);
    setScore((prevScore) => prevScore - 5); 

    // Remove the flicker effect after a short delay
    setTimeout(() => {
      setErrorState(false);
    }, 300);
  };

  const handleFix = () => {
    // Check if the current bar is in the correct position
    if (
      currentCompare > 0 &&
      bars[currentCompare].value < bars[currentCompare - 1].value
    ) {
      triggerError(); // Error: Trying to fix a bar that isn't in the correct position
      return;
    }

    const newBars = [...bars];
    newBars[currentCompare].sorted = true; // Mark the current bar as sorted
    console.log("Sorted current bar at index: ", currentCompare);
    newBars[currentCompare].grayscale = 1; // Remove grayscale for the sorted bar

    // Set the next image to grayscale-0 (if there is a next image)
    if (currentCompare < bars.length - 1) {
      newBars[currentCompare + 1].grayscale = 0;
    }

    setBars(newBars);
    setCurrentCompare((prev) => prev + 1); // Move to the next image
    setScore((prevScore) => prevScore + 10); 

    // Check if all bars are sorted
    if (newBars.every(bar => bar.sorted)) {
      setIsSorted(true); // All bars are sorted, trigger the flag animation and player climbing
      stopTimer();
    }
  };

  // Flag and player movement after sorting
useEffect(() => {
  if (isSorted) {
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex >= bars.length - 1) {
        clearInterval(interval); // Stop when all bars are handled
        setPLayerClimbed(true);
        return;
      }

      setFlagPosition(currentIndex); // Move horizontally to the current bar
      setPlayerY((prevY) => prevY + 12); // Move vertically upwards for each bar

      currentIndex++; // Move to the next bar
    }, 500); // Adjust speed as needed

    return () => clearInterval(interval); // Cleanup on unmount
  }
}, [isSorted, bars.length]);

  const handleLeft = () => {
    if (currentCompare === 0) {
      triggerError(); // Error: Trying to shift beyond the leftmost position
      return;
    }

    if (bars[currentCompare].value >= bars[currentCompare - 1].value) {
      triggerError(); // Error: No need to shift left
      return;
    }

    const newBars = [...bars];
    [newBars[currentCompare], newBars[currentCompare - 1]] = [
      newBars[currentCompare - 1],
      newBars[currentCompare],
    ];

    newBars[currentCompare - 1].grayscale = 0;
    newBars[currentCompare].grayscale = 1;

    setBars(newBars);
    setCurrentCompare((prev) => prev - 1);
    setScore((prevScore) => prevScore + 10); 
  };

  return (
    <div
      className={`relative w-full h-screen bg-cover bg-center overflow-hidden ${
        errorState ? "animate-flicker border-4 border-red-600" : ""
      }`}
      style={{ backgroundImage: "url('/sort-levels-bg.png')" }}
    >
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative">
            <Image
              src="/bubblesort-level3-modal-new.png"
              alt="Bubble Sort Modal"
              width={900}
              height={900}
              className="cursor-pointer rounded-2xl"
            />
            <button className="bg-green-500 text-white font-semibold p-3 absolute bottom-[25%] left-[40%] z-20 rounded-xl cursor-pointer" onClick={closeModal}>Save the princess!</button>
          </div>
        </div>
      )}

      {/* Timer display */}
      <div className="absolute top-0 left-0 w-full text-center text-red-600 font-bold text-2xl p-2">
        {formatTime(elapsedTime)}
      </div>

      {/* Display Lives */}
      <div className="absolute top-0 left-0 p-4 flex gap-2">
      <h1 className="text-2xl font-semibold mx-2">Level: 3</h1>
        {Array.from({ length: 3 }, (_, index) => (
          <Image
            key={index}
            src="/heart.png"
            alt="life"
            width={40}
            height={40}
            className={lives <= index ? "grayscale" : ""}
          />
        ))}
      </div>

       {/* Display Score */}
       <div className="absolute top-0 right-0 p-4 flex gap-2">
        <h1 className="text-2xl font-semibold mx-2">Score: 
          <span className="text-red-600">{score}</span>
        </h1>
      </div>

      {/* Player Image */}
      <Image
        src="/player.png"
        width={400}
        height={400}
        alt="player"
        className="absolute transition-all duration-500 z-10"
        style={{ bottom: `${5 + playerY}%`, left: `${20 + flagPosition * 15}%` }}
      />

      {/* Bar container */}
      <div className="absolute right-20 bottom-0 h-[60%] w-[57%] flex justify-between items-end gap-0 px-4">
        {bars.map((bar, index) => (
          <div
            key={index}
            className={`w-[20%] ${bar.sorted || index === currentCompare ? "" : "grayscale-[50]"}`}
            style={{
              height: `${bar.value}%`,
              backgroundImage: bar.sorted ? "url('/brick-sorted.png')" : "url('/brick1.png')",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              transition: "all 0.3s ease-in-out",
            }}
          />
        ))}
      </div>

      {/* Princess Tower */}
      <Image
        src="/Princess Tower.png"
        width={800}
        height={800}
        alt="princess tower"
        className="absolute left-[63.5vw] top-20 scale-[140%]"
      />

      {/* Left and Fix buttons */}
      <div className="flex absolute bottom-0">
        <Image
          src="/left.png"
          alt="Left"
          width={200}
          height={200}
          className="cursor-pointer"
          onClick={handleLeft}
        />
        <Image
          src="/fix.png"
          alt="Fix"
          width={200}
          height={200}
          className="cursor-pointer z-20"
          onClick={handleFix}
        />
      </div>

      
        {/* Completion screen */}
        {(lives === 0 && elapsedTime === 0  || (bars.length > 0 && bars.every(bar => bar.grayscale === 1))) && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div
            className="w-full h-full flex flex-col items-center justify-center p-12 bg-cover bg-no-repeat rounded-md"
            style={{
              backgroundImage: "url('/level-complete.svg')", // Change to failed image background
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Display 'Level Failed!' */}
            <h1 className="text-6xl mt-4 text-gray-900 font-bold">
              LEVEL FAILED!
            </h1>
      
            <h3 className="text-yellow-400 text-2xl font-semibold ml-20 my-4">
            Oops! You could not made it this time.
            </h3>
      
            {/* Retry and Home buttons */}
            <div className="flex mt-6">
              <Image
                src="/again.png"
                width={200}
                height={200}
                alt="retry"
                className="cursor-pointer"
                onClick={() => {
                  setLives(3); // Reset lives
                  setIsSorted(false); // Reset the sorted flag
                  setCurrentCompare(0); // Reset the comparison index to the start
                  setElapsedTime(0); // Reset the timer
                  setPLayerClimbed(false); // Reset player climbing state
                  setFlagPosition(0); // Reset flag position
                  setBars(generateBars(6)); // Generate new bars with the first index grayscale-0
                  setIsModalOpen(true);
                  setScore(0);
                }}
              />
              <Image
                src="/home.png"
                width={200}
                height={200}
                alt="home"
                className="cursor-pointer"
                onClick={() => {
                  router.push("/");
                }}
              />
            </div>
          </div>
        </div>
      )}
      
      {/* Completion screen for success (when sorted) */}
      {isSorted && playerClimbed && lives > 0 && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50 ">
          <div
            className="w-full h-full flex flex-col items-center justify-center p-12 bg-cover bg-no-repeat rounded-md"
            style={{
              backgroundImage: "url('/level-complete.svg')", // Keep the success image background
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
           {/* Conditional star display */}
           {lives === 1 || elapsedTime > 75 ? (
              <Image src="/star.png" width={250} height={100} alt="1 star" />
            ) : lives === 2 || (elapsedTime > 40 && elapsedTime <= 75) ? (
              <div className="flex justify-between">
                <Image src="/star.png" width={250} height={100} alt="2 stars" />
                <Image src="/star.png" width={250} height={100} alt="2 stars" />
              </div>
            ) : lives === 3 && elapsedTime < 40 ? (
              <div className="flex justify-between">
                <Image src="/star.png" width={250} height={100} alt="3 stars" />
                <Image src="/star.png" width={250} height={100} alt="3 stars" />
                <Image src="/star.png" width={250} height={100} alt="3 stars" />
              </div>
            ) : null}
      
            <h1 className="text-6xl mt-4 text-gray-900 font-bold">
              TIME:
              <span className="text-red-700 font-semibold mx-1">{formatTime(elapsedTime)}</span>
            </h1>
      
            <h1 className="text-4xl mt-4 text-gray-900 font-bold">
              Score:
              <span className="text-yellow-400 font-semibold mx-1">{score}</span>
            </h1>
      
            <div className="flex mt-6">
              <Image
                src="/again.png"
                width={200}
                height={200}
                alt="retry"
                className="cursor-pointer"
                onClick={() => {
                  setLives(3); // Reset lives
                  setIsSorted(false); // Reset the sorted flag
                  setCurrentCompare(0); // Reset the comparison index to the start
                  setElapsedTime(0); // Reset the timer
                  setPLayerClimbed(false); // Reset player climbing state
                  setFlagPosition(0); // Reset flag position
                  setBars(generateBars(6)); // Generate new bars with the first index grayscale-0
                  setIsModalOpen(true);
                  setScore(0);
                }}
              />
              <Image
                src="/home.png"
                width={200}
                height={200}
                alt="home"
                className="cursor-pointer"
                onClick={() => {
                  router.push("/");
                }}
              />
              <Image
                src="/next.png"
                width={150}
                height={150}
                alt="Next"
                className="cursor-pointer"
                onClick={() => router.push("/InsertionSortLevelThree")}
              />
            </div>
          </div>
        </div>
      )}
      

    </div>
  );
};

export default InsertionSortLevelThree;
