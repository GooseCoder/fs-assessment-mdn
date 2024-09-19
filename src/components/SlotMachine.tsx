import { useState } from "react";
import { Symbol } from "./types";
import Slots from "./Slots";
import Balance from "./Balance";

const symbols: Symbol[] = ["♠️", "♥️", "♣️", "♦️", "🃏"];

function SlotMachine() {
  const [credits, setCredits] = useState<number>(100);
  const [slots, setSlots] = useState<Symbol[]>(["♠️", "♠️", "♠️"]);

  return (
    <div>
      <h1>Slot Machine</h1>
      <Slots slots={slots} />
      <Balance credits={credits}/>
      <button>
        Play (1 credit)
      </button>
      <button>Reset Game</button>
    </div>
  );
}

export default SlotMachine;
