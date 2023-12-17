'use client';
import { cn } from '@/lib/utils/tailwind.utils';
import { useCallback, useState } from 'react';
import { FaCaretSquareDown, FaCaretSquareUp } from 'react-icons/fa';

export interface PlayerInputFormProps {}

const PlayerInputForm: React.FC<PlayerInputFormProps> = (props) => {
  const [points, setPoints] = useState(0);
  const [multiplier, setMultiplier] = useState(0);

  const incrementPoints = useCallback(() => {
    if (points < 1000) setPoints(points + 1);
  }, [points]);

  const decrementPoints = useCallback(() => {
    if (points > 0) setPoints(points - 1);
  }, [points]);

  const incrementMultiplier = useCallback(() => {
    if (multiplier < 10) setMultiplier(multiplier + 1);
  }, [multiplier]);

  const decrementMultiplier = useCallback(() => {
    if (multiplier > 0) setMultiplier(multiplier - 1);
  }, [multiplier]);

  const submitHandler = useCallback(() => {
    console.log('Staring...');
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <div className="card-fade flex basis-1/2 flex-col px-3 py-1">
          <p className="text-center text-xs">Points</p>
          <div className="flex items-center gap-2">
            <FaCaretSquareDown
              className="h-8 w-8 cursor-pointer"
              onClick={decrementPoints}
            />
            <input
              type="number"
              onChange={(e) => setPoints(+e.target.value)}
              value={points}
              className="h-8 w-full border-none text-center"
            />
            <FaCaretSquareUp
              className="h-8 w-8 cursor-pointer"
              onClick={incrementPoints}
            />
          </div>
        </div>
        <div className="card-fade flex basis-1/2 flex-col px-3 py-1">
          <p className="text-center text-xs">Multiplier</p>
          <div className="flex items-center gap-2">
            <FaCaretSquareDown
              className="h-8 w-8 cursor-pointer"
              onClick={decrementMultiplier}
            />
            <input
              type="number"
              onChange={(e) => setMultiplier(+e.target.value)}
              value={multiplier}
              className="h-8 w-full border-none text-center"
            />
            <FaCaretSquareUp
              className="h-8 w-8 cursor-pointer"
              onClick={incrementMultiplier}
            />
          </div>
        </div>
      </div>
      <button onClick={submitHandler}>Start</button>
    </div>
  );
};

export default PlayerInputForm;
