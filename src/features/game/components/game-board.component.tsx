'use client';

export interface GameBoardProps {}

const GameBoard: React.FC<GameBoardProps> = (props) => {
  const {} = props;

  return (
    <div className="col-span-1 flex flex-col gap-4 sm:col-span-3">
      <div className="flex gap-4">
        <div className="card-fade basis-1/3 p-2">Points</div>
        <div className="card-fade basis-1/3 p-2">Player</div>
        <div className="card-fade basis-1/3 p-2">Time</div>
      </div>
      <div className="card-flat aspect-[1.75]"></div>
    </div>
  );
};

export default GameBoard;
