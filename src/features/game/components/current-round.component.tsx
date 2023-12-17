'use client';

import { RoundOutcome } from '@/lib/data/slice.models';
import useAppSelector from '@/lib/hooks/app-selector.hook';
import { cn } from '@/lib/utils/tailwind.utils';

export interface CurrentRoundProps {}

const CurrentRound: React.FC<CurrentRoundProps> = (props) => {
  const { players, status, round, roundOutcomes } = useAppSelector(
    (store) => store.game
  );

  return (
    <div className="col-span-3 flex flex-col gap-1">
      <h2>Current Round</h2>
      <div className="card-flat w-full overflow-hidden  rounded-lg">
        <table>
          <thead>
            <tr>
              <td>Name</td>
              <td>Point</td>
              <td>Multiplier</td>
            </tr>
          </thead>
          <tbody>
            {players.map((user, index) => (
              <tr
                key={user.name}
                className={cn({
                  'text-green-500':
                    roundOutcomes[index] === RoundOutcome.WINNING,
                  'text-red-500':
                    roundOutcomes[index] === RoundOutcome.LOSING ||
                    roundOutcomes[index] === RoundOutcome.LOST,
                })}
              >
                <td>{user.name}</td>
                <td>
                  {status === 'betting' && round === 1 ? '_' : user.bet?.points}
                </td>
                <td>
                  {status === 'betting' && round === 1
                    ? '_'
                    : user.bet?.multiplier}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CurrentRound;
