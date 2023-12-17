import useAppDispatch from '@/lib/hooks/app-dispatch.hook';
import { initializePlayers } from '@/store/slices/game.slice';
import { useCallback, useState } from 'react';

export interface WelcomeFormProps {}

const WelcomeForm: React.FC<WelcomeFormProps> = (props) => {
  const [name, setName] = useState('');
  const dispatch = useAppDispatch();

  const startHandler = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (name) dispatch(initializePlayers(name));
    },
    [dispatch, name]
  );

  return (
    <form
      onSubmit={startHandler}
      className="card-flat col-span-1 flex h-full w-full flex-col items-center p-8 sm:col-span-2"
    >
      <h1 className="py-16">Welcome</h1>
      <p className="text-xs">Please insert Your Name</p>
      <input
        value={name}
        type="text"
        name="name"
        onChange={(e) => setName(e.target.value)}
        className="mb-2 mt-4 w-full"
      />
      <button type="submit" className="w-full" disabled={!name}>
        Accept
      </button>
    </form>
  );
};

export default WelcomeForm;
