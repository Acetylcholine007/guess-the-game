'use client';

import useAppSelector from '@/lib/hooks/app-selector.hook';

export interface RankingComponentProps {}

const RankingComponent: React.FC<RankingComponentProps> = (props) => {
  const { players, round } = useAppSelector((store) => store.game);

  return (
    <div className="col-span-1 flex flex-col gap-1 sm:col-span-3">
      <h2>📈 Ranking</h2>
      <div className="card-flat w-full overflow-hidden  rounded-lg">
        <table>
          <thead>
            <tr>
              <td>No.</td>
              <td>Name</td>
              <td>Score</td>
            </tr>
          </thead>
          {players.length === 0 && (
            <tbody>
              {[1, 2, 3, 4, 5].map((player, index) => (
                <tr key={player}>
                  <td>{index + 1}</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
              ))}
            </tbody>
          )}
          {players.length !== 0 && (
            <tbody>
              {players
                .toSorted((a, b) => {
                  if (a.points > b.points) return -1;
                  if (a.points < b.points) return 1;
                  return 0;
                })
                .map((player, index) => (
                  <tr key={player.name}>
                    <td>{index + 1}</td>
                    <td>{round === 1 ? '_' : player.name}</td>
                    <td>{round === 1 ? '_' : player.points}</td>
                  </tr>
                ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default RankingComponent;
