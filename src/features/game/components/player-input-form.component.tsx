'use client';
import { mockOpeningMessages } from '@/features/chat/mocks/chat.mocks';
import useAppDispatch from '@/lib/hooks/app-dispatch.hook';
import useAppSelector from '@/lib/hooks/app-selector.hook';
import { randomNumberFromRange } from '@/lib/utils/random.utils';
import { addChat } from '@/store/slices/chat.slice';
import { placeBet, reset } from '@/store/slices/game.slice';
import { useCallback, useEffect, useState } from 'react';
import { Modal } from 'react-daisyui';
import { FaRegCaretSquareDown, FaRegCaretSquareUp } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';

export interface PlayerInputFormProps {}

const PlayerInputForm: React.FC<PlayerInputFormProps> = (props) => {
  const [points, setPoints] = useState(50);
  const [multiplier, setMultiplier] = useState(1.0);
  const { players, status } = useAppSelector((store) => store.game);
  const dispatch = useAppDispatch();

  const incrementPoints = useCallback(() => {
    if (points < players[0].points) setPoints(points + 25);
  }, [players, points]);

  const decrementPoints = useCallback(() => {
    if (points > 25) setPoints(points - 25);
  }, [points]);

  const incrementMultiplier = useCallback(() => {
    if (multiplier <= 9.75) setMultiplier(multiplier + 0.25);
  }, [multiplier]);

  const decrementMultiplier = useCallback(() => {
    if (multiplier >= 0.25) setMultiplier(multiplier - 0.25);
  }, [multiplier]);

  const submitHandler = useCallback(() => {
    dispatch(placeBet({ multiplier, points }));
  }, [dispatch, multiplier, points]);

  const resetHandler = useCallback(() => {
    dispatch(reset());
  }, [dispatch]);

  useEffect(() => {
    if (players[0].points < points) {
      setPoints(players[0].points);
    }
  }, [players, points]);

  useEffect(() => {
    players.forEach((player) => {
      if (/^CPU [1-4]$/.test(player.name)) {
        setTimeout(() => {
          dispatch(
            addChat({
              id: uuidv4(),
              user: player,
              message:
                mockOpeningMessages[
                  randomNumberFromRange(0, mockOpeningMessages.length - 2)
                ],
            })
          );
        }, Math.random() * 20000);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <div className="card-fade flex basis-1/2 flex-col px-3 py-1">
          <p className="text-center text-xs">Points</p>
          <div className="flex items-center gap-2">
            <FaRegCaretSquareDown
              className="h-8 w-8 cursor-pointer"
              onClick={decrementPoints}
            />
            <input
              type="number"
              onChange={(e) => setPoints(+e.target.value)}
              value={points}
              min={1}
              max={players[0].points ?? 1000}
              className="h-7 w-full border-none text-center"
            />
            <FaRegCaretSquareUp
              className="h-8 w-8 cursor-pointer"
              onClick={incrementPoints}
            />
          </div>
        </div>
        <div className="card-fade flex basis-1/2 flex-col px-3 py-1">
          <p className="text-center text-xs">Multiplier</p>
          <div className="flex items-center gap-2">
            <FaRegCaretSquareDown
              className="h-8 w-8 cursor-pointer"
              onClick={decrementMultiplier}
            />
            <input
              type="number"
              onChange={(e) => setMultiplier(+e.target.value)}
              value={multiplier}
              min={0}
              max={10}
              className="h-7 w-full border-none text-center"
            />
            <FaRegCaretSquareUp
              className="h-8 w-8 cursor-pointer"
              onClick={incrementMultiplier}
            />
          </div>
        </div>
      </div>
      <button
        className="py-3"
        onClick={submitHandler}
        disabled={status === 'calculating'}
      >
        Start
      </button>
      <Modal open={players[0].points === 0 && status === 'betting'}>
        <Modal.Header className="font-bold">Game Lost</Modal.Header>
        <Modal.Body>
          You&apos;ve ran out of points to bet as you have the the last round.
          You can reset the game again.
        </Modal.Body>
        <Modal.Actions>
          <button onClick={resetHandler}>New Game</button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default PlayerInputForm;
