const generateBars = (count) => {
    const uniqueHeights = new Set();
    
    while (uniqueHeights.size < count) {
      // Generate a random height between 30 and 129 (inclusive)
      uniqueHeights.add(Math.floor(Math.random() * 100) + 30);
    }
  
    return Array.from(uniqueHeights).map((value, index) => ({
      value,
      grayscale: index === 0 ? 0 : 1,
    }));
  };

export default generateBars;