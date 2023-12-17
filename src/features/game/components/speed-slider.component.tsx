'use client';

import useAppDispatch from '@/lib/hooks/app-dispatch.hook';
import useAppSelector from '@/lib/hooks/app-selector.hook';
import { changeSpeed } from '@/store/slices/game.slice';

export interface SpeedSliderProps {}

const SpeedSlider: React.FC<SpeedSliderProps> = (props) => {
  const { speed } = useAppSelector((store) => store.game);
  const dispatch = useAppDispatch();

  return (
    <div className="col-span-3 flex flex-col gap-1">
      <h2>Speed</h2>
      <div className="card-flat flex flex-col p-3">
        <input
          value={speed}
          type="range"
          min={1}
          max={5}
          step={1}
          onChange={(e) => dispatch(changeSpeed(+e.target.value))}
        />
        <div className="flex w-full items-center justify-between">
          {[1, 2, 3, 4, 5].map((speed) => (
            <p key={speed} className="text-xs">{`${speed}x`}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpeedSlider;
