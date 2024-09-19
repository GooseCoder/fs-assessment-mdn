import { useEffect, useState } from "react";
import { Symbol } from "./types";
import Slots from "./Slots";
import Balance from "./Balance";

const symbols: Symbol[] = ["♠️", "♥️", "♣️", "♦️", "🃏"];

interface SlotMachineProps {
  startCredits: number;
}

function SlotMachine({ startCredits }: SlotMachineProps) {
  const [credits, setCredits] = useState<number>(startCredits);
  const [slots, setSlots] = useState<Symbol[]>(["", "", ""]);
  const [spinning, setSpinning] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  
  useEffect(() => {
    if (credits === 0 && !spinning) {
      setMessage("Game over! Press Play again!");
    }
  }, [credits, spinning]);

  const spin = (): void => {
    if (credits > 0 && !spinning) {
      setSpinning(true);
      setMessage("");
      setCredits((prevCredits) => prevCredits - 1);

      const newSlots: Symbol[] = slots.map(
        () => symbols[Math.floor(Math.random() * symbols.length)]
      );

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
      setMessage("You won 10 credits!");
    } else if (uniqueSymbols.size === 2) {
      setCredits((prevCredits) => prevCredits + 2);
      setMessage("You won 2 credits!");
    }
  };

  const resetGame = (): void => {
    setCredits(startCredits);
    setSlots(["", "", ""]);
    setMessage("");
    setSpinning(false);
  };

  return (
    <div>
      <h1>Super Slots</h1>
      <Slots slots={slots} />
      <Balance credits={credits} />
      <button onClick={spin} disabled={spinning || credits === 0}>
        {spinning ? "Spinning..." : "Play (1 credit)"}
      </button>
      <button onClick={resetGame}>Play Again!</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default SlotMachine;
