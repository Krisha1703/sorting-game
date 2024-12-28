const BarsContainer = ({ bars, isSorted }) => {
    return (
      <div className="absolute right-20 bottom-0 h-[60%] w-[57%] flex justify-between items-end gap-0 px-4">
        {bars.map((bar, index) => (
          <div
            key={index}
            className={`w-[20%] ${bar.grayscale === 1 ? "grayscale" : ""}`}
            style={{
              height: `${bar.value}%`,
              backgroundImage: isSorted ? "url('/brick-sorted.png')" : "url('/brick1.png')",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              transition: "all 0.3s ease-in-out",
            }}
          ></div>
        ))}
      </div>
    );
  };
  
  export default BarsContainer;
  