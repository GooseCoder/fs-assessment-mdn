import { useState } from "react";
import { Symbol } from "./types";
import Slots from "./Slots";
import Balance from "./Balance";

const symbols: Symbol[] = ["♠️", "♥️", "♣️", "♦️", "🃏"];

function SlotMachine() {
  const [credits, setCredits] = useState<number>(10);
  const [slots, setSlots] = useState<Symbol[]>(["", "", ""]);
  const [spinning, setSpinning] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const spin = (): void => {
    if (credits > 0 && !spinning) {
      setMessage("");
      setSpinning(true);
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

  return (
    <div>
      <h1>Super Slots</h1>
      <Slots slots={slots} />
      <Balance credits={credits}/>
      <button onClick={spin} disabled={spinning || credits === 0}>
        {spinning ? "Spinning..." : "Play (1 credit)"}
      </button>
      <button>Play Again!</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default SlotMachine;
