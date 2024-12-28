import SortingChallenge from "@/components/SortingChallenge";

const InsertionSortChallenge = () => {
  return (
    <SortingChallenge
      algoName="Insertion Sort"
      backgroundImage="/insertion-challenge.svg"
      levelLink="/InsertionSort/Level/1"
      tutorialLink="/insertionSortTutorial"
    />
  );
};

export default InsertionSortChallenge;
