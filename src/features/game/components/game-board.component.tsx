'use client';

import useAppDispatch from '@/lib/hooks/app-dispatch.hook';
import useAppSelector from '@/lib/hooks/app-selector.hook';
import useMeter from '@/lib/hooks/meter.hook';
import useRealTimeClock from '@/lib/hooks/real-time.hook';
import { calculateResult } from '@/store/slices/game.slice';
import { useEffect } from 'react';

export interface GameBoardProps {}

const GameBoard: React.FC<GameBoardProps> = (props) => {
  const { status, players, speed, outcomeMultiplier } = useAppSelector(
    (store) => store.game
  );
  const dispatch = useAppDispatch();
  const currentTime = useRealTimeClock();
  const { count, meterRef, resetHandler, startHandler } = useMeter(
    outcomeMultiplier ?? 0,
    speed
  );

  useEffect(() => {
    if (status === 'calculating') {
      resetHandler();
      startHandler();
    }
  }, [resetHandler, startHandler, status]);

  useEffect(() => {
    if (
      status === 'calculating' &&
      count.toFixed(2) === outcomeMultiplier?.toFixed(2)
    ) {
      dispatch(calculateResult());
    }
  }, [count, dispatch, outcomeMultiplier, status]);

  return (
    <div className="col-span-1 flex flex-col gap-4 sm:col-span-3">
      <div className="flex gap-4">
        <div className="card-fade basis-1/3 p-2 text-center">
          {players[0]?.points ?? ''}
        </div>
        <div className="card-fade basis-1/3 p-2 text-center">
          {players[0]?.name ?? ''}
        </div>
        <div className="card-fade basis-1/3 p-2 text-center">{currentTime}</div>
      </div>
      <div className="card-flat flex aspect-[1.75] flex-col items-center justify-center gap-8 p-8">
        <h1 className="pd-8">
          {count !== 0 && status === 'betting'
            ? outcomeMultiplier?.toFixed(2)
            : ' '}
        </h1>
        <meter
          className="w-full"
          ref={meterRef}
          high={10}
          low={0}
          min={0}
          max={10}
        />
        <hr className="w-full" />
        <div className="flex w-full items-center justify-between">
          {Array.from(Array(11).keys()).map((multiplier) => (
            <p key={multiplier} className="text-xs">
              {multiplier}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
