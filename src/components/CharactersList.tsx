import { Character } from "../types";
import ProgressBar from "./ProgressBar";

interface CharactersListProps {
  data: Character[];
  handleSetSelectedCharacter: (char: Character) => void;
}

const CharactersList = ({
  data,
  handleSetSelectedCharacter,
}: CharactersListProps) => {
  return (
    <ul className="mt-6 px-1 flex flex-col gap-2">
      {data.map((character) => (
        <li
          key={character.id}
          className="p-4 flex justify-between items-center"
        >
          <div className="flex gap-2">
            <img src={character.img} alt="" width={60} />
            <div className="flex flex-col gap-1">
              <p style={{ fontSize: "2rem" }}>{character.name}</p>
              <div className="flex flex-col gap-4">
                <ProgressBar
                  currValue={character.hp}
                  totalValue={100}
                  color="green"
                  title="HP"
                />
                <ProgressBar
                  currValue={character.energy}
                  totalValue={10}
                  color="yellow"
                  title="Energy"
                />
              </div>
            </div>
          </div>
          <button
            onClick={() => handleSetSelectedCharacter(character)}
            className="p-4 hover:cursor-pointer bg-white border-4 border-black"
          >
            <img src="/item-bag.svg" alt="" className="w-14" />
          </button>
        </li>
      ))}
    </ul>
  );
};

export default CharactersList;
