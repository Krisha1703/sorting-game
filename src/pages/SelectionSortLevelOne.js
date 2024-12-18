import React, { useState, useEffect, useRef } from "react";
import "../app/globals.css";
import Image from "next/image";

const SelectionSortLevelOne = () => {
  const [bars, setBars] = useState([]);
  const [currentCompare, setCurrentCompare] = useState(0); // Index of the current bar being compared
  const [elapsedTime, setElapsedTime] = useState(0); // Timer in seconds
  const [timerInterval, setTimerInterval] = useState(null); // Store interval for clearing it
  const [lives, setLives] = useState(3); // Tracking lives
  const [selectedBarIndex, setSelectedBarIndex] = useState(null); // Tracks the selected bar with "brick-sorted"
  const [sortedRoundIndex, setSortedRoundIndex] = useState(0); // Tracks the index up to which bars are sorted
   const [errorState, setErrorState] = useState(false); // To trigger screen flicker effect
  const [isAllSorted, SetIsAllSorted] = useState(false);
  const [playerY, setPlayerY] = useState(0); // Initial Y position of the player
  const [flagPosition, setFlagPosition] = useState(0); // Track flag position
  const [playerClimbed, setPLayerClimbed] = useState(false);
 

  // Generate initial bars on mount
  useEffect(() => {
    setBars(generateBars(6));
    startTimer(); // Start the timer when the component loads
  }, []);

  const generateBars = (count) =>
    Array.from({ length: count }, (_, index) => ({
      value: Math.floor(Math.random() * 100) + 30,
      grayscale: index === 0 ? 0 : 1, // Initial grayscale for the first bar
      sorted: false,
    }));

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

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };
  
  const triggerError = () => {
    setErrorState(true);
    setLives((prev) => prev - 1);

    // Remove the flicker effect after a short delay
    setTimeout(() => {
      setErrorState(false);
    }, 300);
  };

  const handleSwapAndRestart = () => {
    setBars((prevBars) => {
      const updatedBars = [...prevBars];
  
      if (selectedBarIndex !== null) {
        // Swap the selected bar with the bar at `sortedRoundIndex`
        [updatedBars[sortedRoundIndex], updatedBars[selectedBarIndex]] = [
          updatedBars[selectedBarIndex],
          updatedBars[sortedRoundIndex],
        ];
      }
  
      // Ensure the swapped bar at `sortedRoundIndex` has the `brick-sorted` image
      updatedBars.forEach((bar, index) => {
        if (index <= sortedRoundIndex) {
          bar.sorted = true;
          bar.image = "/brick-sorted.png"; // Mark as sorted
        } else {
          bar.image = "/brick1.png"; // Reset other bars
          bar.sorted = false;
        }
      });

      return updatedBars;
    });
  
    // Move to the next round only if `sortedRoundIndex` is still within bounds
    setSortedRoundIndex((prev) => {
      if (prev + 1 < bars.length) {
        return prev + 1; // Increment only if within bounds
      }
      return prev; // Stay at the last sorted index if no more rounds
    });
  
    setSelectedBarIndex(null); // Clear the selected bar
    setCurrentCompare(sortedRoundIndex + 1); // Start next round from the next bar
    
  // Check if all bars are sorted
  if (bars.every((bar) => bar.sorted)) {
    SetIsAllSorted(true);
    stopTimer(); // Stop the timer when all bars are sorted
  }
  };
  

  const handleSelect = () => {
    // Check if the user selected a bar when they shouldn't, based on height comparison
    if (
      currentCompare > 0 && // Ensure it's not the first bar
      bars[currentCompare - 1].value < bars[currentCompare].value
    ) {
      // If the previous bar's height is greater than the current bar's height, trigger error
      triggerError();
      return;
    }


    setBars((prevBars) => {
      const updatedBars = [...prevBars];
  
      // Mark the current bar as selected
      updatedBars.forEach((bar, index) => {
        if (index === currentCompare) {
          bar.sorted = true;
          bar.image = "/brick-sorted.png";
        } else if (index > sortedRoundIndex) {
          bar.image = "/brick1.png"; // Reset unsorted bars
          bar.sorted = false;
        }
      });
  
      // Update the selectedBarIndex
      setSelectedBarIndex(currentCompare);
  
      return updatedBars;
    });
  
  // Check if at the end of the current round
  if (currentCompare === bars.length - 1) {
    handleSwapAndRestart(); // Swap and restart for the next round

    // Check if all bars are sorted
    if (bars.every((bar) => bar.sorted)) {
      SetIsAllSorted(true);
      stopTimer();
    }

  } else {
    // Move to the next bar for comparison
    setCurrentCompare((prev) => Math.min(prev + 1, bars.length - 1));
  }
  };

  
  const handleSkip = () => {
    if (currentCompare === 0) {
      // If it's the first bar, and the user tries to select, it's an error
      triggerError();
      return;
    }

    if (currentCompare === bars.length - 1) {
      handleSwapAndRestart(); // Swap and restart for the next round
    } else {
      // Move to the next bar
      setCurrentCompare((prev) => Math.min(prev + 1, bars.length - 1));
    }
  };
  
   // Flag and player movement after sorting
  useEffect(() => {
    if (isAllSorted) {
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
    
  }, [isAllSorted, bars.length]);
  
  useEffect(() => {
    // Stop the timer if all bars are sorted or if lives reach 0
    if (isAllSorted || lives === 0) {
      stopTimer(); // This will stop the timer
    }
  }, [isAllSorted, lives]); // Watch both `isAllSorted` and `lives` for changes
  
  

  return (
    <div
      className={`relative w-full h-screen bg-cover bg-center overflow-hidden ${
        errorState ? "animate-flicker border-4 border-red-600" : ""
      }`}
      style={{ backgroundImage: "url('/sort-levels-bg.png')" }}
    >
      {/* Timer display */}
      <div className="absolute top-0 left-0 w-full text-center text-red-600 font-bold text-2xl p-2">
        {formatTime(elapsedTime)}
      </div>

      {/* Display Lives */}
      <div className="absolute top-0 left-0 p-4 flex gap-2">
        <h1 className="text-2xl font-semibold mx-2">Level: 1</h1>
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
            className={`w-[20%] ${index === currentCompare ? "grayscale-0" : "grayscale"} ${bar.sorted ? "grayscale-0" : "grayscale"}`}
            style={{
              height: `${bar.value}%`,
              backgroundImage: bar.sorted
                ? "url('/brick-sorted.png')"
                : "url('/brick1.png')",
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

      {/* Select and Skip buttons */}
      <div className="flex absolute bottom-0">
        <Image
          src="/select.png"
          alt="Select"
          width={200}
          height={200}
          className="cursor-pointer"
          onClick={handleSelect}
        />
        <Image
          src="/skip.png"
          alt="Skip"
          width={200}
          height={200}
          className="cursor-pointer z-20"
          onClick={handleSkip}
        />
      </div>

      {/* Completion screen */}
              {(lives === 0 || (bars.length > 0 && bars.every(bar => bar.grayscale === 1))) && (
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
            
                  <h1 className="text-6xl mt-4 text-gray-900 font-bold">
                    TIME:
                    <span className="text-red-700 font-semibold mx-1">{formatTime(elapsedTime)}</span>
                  </h1>

                  <h3 className="text-yellow-400 text-2xl font-semibold ml-20 my-4">
                    Oops! Please try again or go back to practise game.
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
                        SetIsAllSorted(false); // Reset the sorted flag
                        setCurrentCompare(0); // Reset the comparison index to the start
                        setElapsedTime(0); // Reset the timer
                        setPLayerClimbed(false); // Reset player climbing state
                        setFlagPosition(0); // Reset flag position
                        setBars(generateBars(6)); // Generate new bars with the first index grayscale-0
                        startTimer(); // Restart the timer
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
            {isAllSorted && playerClimbed && lives > 0 && (
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
                 {lives === 1 || elapsedTime > 45 ? (
                    <Image src="/star.png" width={250} height={100} alt="1 star" />
                  ) : lives === 2 || (elapsedTime > 30 && elapsedTime <= 45) ? (
                    <div className="flex justify-between">
                      <Image src="/star.png" width={250} height={100} alt="2 stars" />
                      <Image src="/star.png" width={250} height={100} alt="2 stars" />
                    </div>
                  ) : lives === 3 && elapsedTime < 30 ? (
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
            
                  <h3 className="text-yellow-400 text-2xl font-semibold ml-20 my-4">
                    You have completed this level successfully!
                  </h3>
            
                  <div className="flex mt-6">
                    <Image
                      src="/again.png"
                      width={200}
                      height={200}
                      alt="retry"
                      className="cursor-pointer"
                      onClick={() => {
                        setLives(3); // Reset lives
                        SetIsAllSorted(false); // Reset the sorted flag
                        setCurrentCompare(0); // Reset the comparison index to the start
                        setElapsedTime(0); // Reset the timer
                        setPLayerClimbed(false); // Reset player climbing state
                        setFlagPosition(0); // Reset flag position
                        setBars(generateBars(6)); // Generate new bars with the first index grayscale-0
                        startTimer(); // Restart the timer
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
                      onClick={() => router.push("/SelectionSortLevelThree")}
                    />
                  </div>
                </div>
              </div>
            )}
            

    </div>
  );
};

export default SelectionSortLevelOne;
