import { useEffect, useState } from "react";
import { Symbol } from "./types";
import Slots from "./Slots";
import Balance from "./Balance";
import Winnings from "./Winnings";

import useSound from 'use-sound';
import spinSound from './sounds/spin.wav';
import winSound from './sounds/win.wav';

const symbols: Symbol[] = ["♠️", "♥️", "♣️", "♦️", "🃏"];
const getRandomSlots = () => {
  return Array.from({ length: 3 }, () => symbols[Math.floor(Math.random() * symbols.length)]);
};

interface SlotMachineProps {
  startCredits: number;
}

function SlotMachine({ startCredits }: SlotMachineProps) {
  const [credits, setCredits] = useState<number>(startCredits);
  const [slots, setSlots] = useState<Symbol[]>(getRandomSlots());
  const [spinning, setSpinning] = useState<boolean>(false);
  const [winnings, setWinnings] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  const [playSpinSound] = useSound(spinSound);
  const [playWinSound] = useSound(winSound);

  useEffect(() => {
    if (credits === 0 && !spinning) {
      setMessage("Game over! Press Play again!");
    }
  }, [credits, spinning]);

  const spin = (): void => {
    if (credits > 0 && !spinning) {
      setSpinning(true);
      setWinnings(0);
      setMessage('');
      playSpinSound();
      setCredits(prevCredits => prevCredits - 1);
      const newSlots: Symbol[] = slots.map(() => symbols[Math.floor(Math.random() * symbols.length)]);
      setTimeout(() => {
        setSlots(newSlots);
        setSpinning(false);
        checkWin(newSlots);
      }, 1000);
    }
  };

  const checkWin = (newSlots: Symbol[]): void => {
    const uniqueSymbols = new Set(newSlots);
    if (uniqueSymbols.size === 1) {
      setCredits((prevCredits) => prevCredits + 10);
      setWinnings(10);
      playWinSound();
    } else if (uniqueSymbols.size === 2) {
      setCredits((prevCredits) => prevCredits + 2);
      setWinnings(2);
      playWinSound()
    }
  };

  const resetGame = (): void => {
    setCredits(startCredits);
    setSlots(getRandomSlots());
    setMessage("");
    setSpinning(false);
  };

  return (

    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-80 bg-slate-700 rounded-lg p-6 shadow-lg text-center">
        <Slots slots={slots} symbols={symbols} spinning={spinning}/>
        {credits > 0 || spinning ? (
          <button
          onClick={spin}
          disabled={spinning}
          className="w-1/2 py-2 px-4 bg-red-600 text-white font-bold rounded-lg mb-4 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {spinning ? "Spinning..." : "Spin"}
          </button>
        ) : (
          <button
          onClick={resetGame}
          className="w-1/2 py-2 px-4 bg-blue-600 text-white font-bold rounded-lg mb-4 hover:bg-blue-700"
          >
            Play Again!
          </button>
        )}

        <Winnings winnings={winnings} />
        <Balance credits={credits} />

        {message && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-lg">
            <p className="font-bold">{message}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SlotMachine;
