
const handleAction = (
    action, 
    bars, 
    currentCompare, 
    setBars, 
    isSorted, 
    setIsSorted, 
    setScore, 
    setLives, 
    setError,
    setCurrentCompare,
    stopTimer
  ) => {
    const checkSorted = (arr) => {
        for (let i = 0; i < arr.length - 1; i++) {
          if (arr[i].value > arr[i + 1].value) return false;
        }
        return true;
      };

    if (isSorted || bars.length === 0) return;

    const [i, j] = currentCompare;
    const newBars = [...bars];

    // Reset all bars to grayscale except the ones being compared
    newBars.forEach((bar, index) => {
      if (index === i || index === j) {
        bar.grayscale = 0; // Set grayscale-0 for the bars being compared
      } else {
        bar.grayscale = 1; // Other bars have grayscale-1
      }
    });

    if ((action === "swap" && newBars[i].value > newBars[j].value) ||
        (action === "noSwap" && newBars[i].value <= newBars[j].value)) {

      if (action === "swap") {
        // Swap values of the two bars being compared
        [newBars[i], newBars[j]] = [newBars[j], newBars[i]];
        setScore((prevScore) => prevScore + 10); // Add points for correct swap
      }

      // Update the next pair of bars to be compared
      if (j === newBars.length - 1) {
        setCurrentCompare([0, 1]);
      } else {
        setCurrentCompare([i + 1, j + 1]);
      }

      // After a swap/no-swap action, move the highlight forward
      if (i === 0 && j === 1) {
        // Move 1st bar to grayscale-1 and highlight next pair (2nd and 3rd)
        newBars[0].grayscale = 1;
        newBars[1].grayscale = 0; // 2nd image stays grayscale-0
        newBars[2].grayscale = 0; // 3rd image becomes grayscale-0
      } else if (i === 1 && j === 2) {
        // Move 2nd bar to grayscale-1 and highlight next pair (3rd and 4th)
        newBars[1].grayscale = 1;
        newBars[2].grayscale = 0; // 3rd image stays grayscale-0
        newBars[3].grayscale = 0; // 4th image becomes grayscale-0
      } else if (i === 2 && j === 3) {
        // Move 3rd bar to grayscale-1 and highlight next pair (4th and 5th)
        newBars[2].grayscale = 1;
        newBars[3].grayscale = 0; // 4th image stays grayscale-0
        newBars[4].grayscale = 0; // 5th image becomes grayscale-0
      } else if (i === 3 && j === 4) {
        // Move 4th bar to grayscale-1 and highlight next pair (5th and 6th)
        newBars[3].grayscale = 1;
        newBars[4].grayscale = 0; // 5th image stays grayscale-0
        newBars[5].grayscale = 0; // 6th image becomes grayscale-0
      } else if (i === 4 && j === 5) {
        // Move 5th bar to grayscale-1 and highlight next pair (6th and 1st)
        newBars[4].grayscale = 1;
        newBars[5].grayscale = 0; // 6th image stays grayscale-0
      }

      // Check if the array is sorted after this operation
      if (checkSorted(newBars)) {
        // Highlight all bars to indicate success
        newBars.forEach((bar) => (bar.grayscale = 0));
        setIsSorted(true);
        stopTimer();
      }
      setBars(newBars);
    } else {
      // If the action was incorrect, show an error
      setError(true);
      setLives((prevLives) => {
        const newLives = prevLives - 1;
        if (newLives <= 0) {
          setIsSorted(false); // Trigger modal when no lives are left
        }
        return newLives;
      });
      setScore((prevScore) => prevScore - 5); // Deduct points for incorrect swap
      setTimeout(() => setError(false), 1000);
    }
  };

export default handleAction;