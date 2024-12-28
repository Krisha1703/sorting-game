const Score = ({ score }) => {
    return (
      <div className="absolute top-0 right-0 p-4 flex gap-2">
        <h1 className="text-2xl font-semibold mx-2">
          Score: <span className="text-red-600">{score}</span>
        </h1>
      </div>
    );
  };
  
  export default Score;
  