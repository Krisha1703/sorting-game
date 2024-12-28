export const triggerError = (setErrorState, setLives, setScore, onGameOver) => {
  setErrorState(true); // Trigger the error animation
  setLives((prevLives) => {
    const newLives = prevLives - 1;
    if (newLives <= 0) {
      onGameOver(); // Trigger game over modal when lives reach zero
    }
    return newLives;
  });
  setScore((prevScore) => Math.max(0, prevScore - 5)); // Deduct points (minimum score is 0)

  // Remove the flicker effect after a short delay
  setTimeout(() => {
    setErrorState(false);
  }, 300);
};


export const handleFix = (
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
) => {
  if (
    currentCompare > 0 &&
    bars[currentCompare].value < bars[currentCompare - 1].value
  ) {
    triggerError(setErrorState, setLives, setScore, onGameOver);
    return;
  }

  const newBars = [...bars];
  newBars[currentCompare].sorted = true; // Mark the current bar as sorted
  setScore((prevScore) => prevScore + 10);
  newBars[currentCompare].grayscale = 1; // Remove grayscale for the sorted bar

  // Set the next bar to grayscale-0 (if there is a next bar)
  if (currentCompare < bars.length - 1) {
    newBars[currentCompare + 1].grayscale = 0;
  }

  setBars(newBars);
  setCurrentCompare((prev) => prev + 1); // Move to the next bar

  // Check if all bars are sorted
  if (newBars.every((bar) => bar.sorted)) {
    setIsSorted(true); // All bars are sorted
    stopTimer();
  }
};

export const handleLeft = (
  bars,
  currentCompare,
  setBars,
  setScore,
  setLives,
  setErrorState,
  setCurrentCompare,
  onGameOver
) => {
  if (currentCompare === 0) {
    triggerError(setErrorState, setLives, setScore, onGameOver);
    return;
  }

  if (bars[currentCompare].value >= bars[currentCompare - 1].value) {
    triggerError(setErrorState, setLives, setScore, onGameOver);
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
  setCurrentCompare((prev) => prev - 1); // Move to the left
  setScore((prevScore) => prevScore + 10);
};
