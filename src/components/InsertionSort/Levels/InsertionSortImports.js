// Import components and functions
import generateBars from "./BarGenerator";
import LevelModal from "@/components/LevelModal";
import Lives from "@/components/Lives";
import Score from "@/components/Score";
import PlayerClimb from "@/components/PlayerClimb";
import formatTime from "@/components/FormatTimer";
import BarsContainer from "@/components/InsertionSort/Levels/BarsContainer";
import SuccessModal from "@/components/SuccessModal";
import FailureModal from "@/components/FailureModal";
import PrincessTower from "@/components/PrincessTower";
import { handleFix, handleLeft } from "@/components/InsertionSort/Levels/InsertionSorting";
import LeftFixButtons from "@/components/InsertionSort/Levels/LeftFixButtons";

// Export them together for easy import
export {
  generateBars,
  LevelModal,
  Lives,
  Score,
  PlayerClimb,
  formatTime,
  BarsContainer,
  SuccessModal,
  FailureModal,
  PrincessTower,
  handleFix,
  handleLeft,
  LeftFixButtons,
};
