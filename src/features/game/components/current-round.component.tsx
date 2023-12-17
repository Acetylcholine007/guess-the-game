'use client';

import { mockUsers } from '../mocks/game.mocks';

export interface CurrentRoundProps {}

const CurrentRound: React.FC<CurrentRoundProps> = (props) => {
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
            {mockUsers.map((user) => (
              <tr key={user.name}>
                <td>{user.name}</td>
                <td>{user.bet?.points}</td>
                <td>{user.bet?.multiplier}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CurrentRound;
