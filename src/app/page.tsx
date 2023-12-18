'use client';

import ChatList from '@/features/chat/components/chat-list.component';
import CurrentRound from '@/features/game/components/current-round.component';
import GameBoard from '@/features/game/components/game-board.component';
import PlayerInputForm from '@/features/game/components/player-input-form.component';
import RankingComponent from '@/features/game/components/ranking.component';
import SpeedSlider from '@/features/game/components/speed-slider.component';
import WelcomeForm from '@/features/game/components/welcome-form.component';
import useAppSelector from '@/lib/hooks/app-selector.hook';

export default function Home() {
  const { players } = useAppSelector((store) => store.game);

  return (
    <main className="flex h-full w-full flex-col gap-4 overflow-y-auto p-8 sm:px-24 sm:py-16">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-5">
        {players.length !== 0 && (
          <div className="col-span-1 flex flex-col gap-4 sm:col-span-2">
            <PlayerInputForm />
            <div className="max-md:hidden">
              <CurrentRound />
            </div>
            <SpeedSlider />
          </div>
        )}
        {players.length === 0 && <WelcomeForm />}
        <GameBoard />
        {players.length !== 0 && (
          <div className="md:hidden">
            <CurrentRound />
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-5">
        <RankingComponent />
        <ChatList />
      </div>
    </main>
  );
}
