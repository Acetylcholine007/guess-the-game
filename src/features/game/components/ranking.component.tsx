'use client';

export interface RankingComponentProps {}

const RankingComponent: React.FC<RankingComponentProps> = (props) => {
  const {} = props;

  return (
    <div className="col-span-1 flex flex-col gap-1 sm:col-span-3">
      <h2>Ranking</h2>
      <div className="card-flat w-full overflow-hidden  rounded-lg">
        <table>
          <thead>
            <tr>
              <td>No.</td>
              <td>Name</td>
              <td>Score</td>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5].map((player) => (
              <tr key={player}>
                <td>{player}</td>
                <td>{'_'}</td>
                <td>{'_'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RankingComponent;
