import moment from "moment";
import { useEffect, useState } from "react";
import { TCharacter } from "../types";

interface IQuestLoopProps {
  character: TCharacter;
  handleSetCharacterQuestTime: () => void;
  handleResetCharacter: () => void;
  handleSetClaimableReward: () => void;
  requestId: React.MutableRefObject<number>;
}

const useQuestLoop = ({
  character,
  handleSetCharacterQuestTime,
  handleResetCharacter,
  handleSetClaimableReward,
  requestId,
}: IQuestLoopProps) => {
  const [onQuest, setOnQuest] = useState<boolean>(false);

  useEffect(() => {
    function runGameLoop() {
      setOnQuest(true);
      const setQuestCompletionTime = () => {
        handleSetCharacterQuestTime();

        requestId.current = requestAnimationFrame(setQuestCompletionTime);
      };
      requestAnimationFrame(setQuestCompletionTime);
    }

    const stopGameLoop = () => {
      cancelAnimationFrame(requestId.current);
    };

    // Check if current time is over completion time
    if (moment().isSameOrAfter(character?.questCompletionTime)) {
      stopGameLoop();
      setOnQuest(false);
      handleResetCharacter();
      handleSetClaimableReward();
    } else if (character?.questCompletionTime !== null) {
      runGameLoop();
    }

    return () => stopGameLoop();
  }, [
    character,
    handleSetCharacterQuestTime,
    handleResetCharacter,
    handleSetClaimableReward,
    requestId,
  ]);

  return onQuest;
};

export default useQuestLoop;
