'use client';

export interface SpeedSliderProps {}

const SpeedSlider: React.FC<SpeedSliderProps> = (props) => {
  const {} = props;

  return (
    <div className="col-span-3 flex flex-col gap-1">
      <h2>Speed</h2>
      <div className="card-flat flex flex-col p-3">
        <input type="range" min={1} max={5} step={1} />
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
