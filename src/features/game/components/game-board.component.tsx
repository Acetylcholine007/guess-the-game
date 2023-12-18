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
  const { count, meterRef, dotRef, lineRef, resetHandler, startHandler } =
    useMeter(outcomeMultiplier ?? 0, speed);

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
        <div className="card-fade flex basis-1/3 items-center px-2 py-2 text-center text-xl">
          <span className="text-left text-4xl">🏅</span>
          <span className="grow">{players[0]?.points ?? ''}</span>
        </div>
        <div className="card-fade flex basis-1/3 items-center px-2 py-2 text-center text-xl">
          <span className="text-left text-4xl">🧑</span>
          <span className="grow">{players[0]?.name ?? ''}</span>
        </div>
        <div className="card-fade flex basis-1/3 items-center px-2 py-2 text-center text-xl">
          <span className="text-left text-4xl">🕒</span>
          <span className="grow">{currentTime}</span>
        </div>
      </div>
      <div className="card-flat relative flex aspect-[1.5] flex-col items-center justify-center gap-8 p-8">
        <meter
          className="hidden w-full"
          ref={meterRef}
          high={10}
          low={0}
          min={0}
          max={10}
        />

        <h1 className="pd-8 drop-shadow-glow absolute left-1/2 top-12 -translate-x-1/2 text-5xl  sm:top-24 sm:text-7xl">
          {count !== 0 && status === 'betting'
            ? `${outcomeMultiplier?.toFixed(2)}x`
            : '0.00x'}
        </h1>
        <svg className="w-full grow" viewBox="-12 0 412 210">
          <path
            d="M 5 200 Q 200 200 400 0"
            stroke="blue"
            strokeWidth="0.25rem"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={'0% 150%'}
            strokeDashoffset={'5%'}
            className="stroke-rose-500"
            ref={lineRef}
          />
          <circle
            cx={0}
            cy={200}
            r="0.6rem"
            className="fill-yellow-500 stroke-yellow-300"
            ref={dotRef}
          />
        </svg>
        <div className="mx-4 flex w-full items-center justify-between border-t-[0.06rem] pt-6">
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
