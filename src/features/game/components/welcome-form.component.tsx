import { useState } from 'react';

export interface WelcomeFormProps {}

const WelcomeForm: React.FC<WelcomeFormProps> = (props) => {
  const [name, setName] = useState('');

  return (
    <form className="card-flat col-span-1 flex h-full w-full flex-col items-center p-8 sm:col-span-2">
      <h1 className="py-16">Welcome</h1>
      <p className="text-xs">Please insert Your Name</p>
      <input
        value={name}
        type="text"
        name="name"
        onChange={(e) => setName(e.target.value)}
        className="mb-2 mt-4 w-full"
      />
      <button type="submit" className="w-full" disabled={!true}>
        Accept
      </button>
    </form>
  );
};

export default WelcomeForm;
