import { useEffect, useState } from "react";
import { Symbol } from "./types";

interface SlotsProps {
  slots: Symbol[];
  symbols: Symbol[];
  spinning: boolean;
}

interface SlotProps {
  spinning: boolean;
  symbols: Symbol[];
  symbol: Symbol;
}

const Slot: React.FC<SlotProps> = ({ spinning, symbol, symbols }) => {
  const [displaySymbol, setDisplaySymbol] = useState(symbol);

  useEffect(() => {
    if (spinning) {
      const interval = setInterval(() => {
        setDisplaySymbol(symbols[Math.floor(Math.random() * symbols.length)]);
      }, 100);
      return () => clearInterval(interval);
    } else {
      setDisplaySymbol(symbol);
    }
  }, [spinning, symbol]);

  return (
    <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center text-4xl overflow-hidden">
      <div className={`transition-all duration-100 ${spinning ? 'animate-bounce' : ''}`}>
        {displaySymbol}
      </div>
    </div>
  );
};

const Slots = ({ slots, symbols, spinning }: SlotsProps) => {
  return (
    <div className="bg-white rounded-lg p-4 mb-4 flex justify-between">
      {slots.map((symbol, index) => (
        <Slot
          key={`slot-${index}`}
          symbol={symbol}
          symbols={symbols}
          spinning={spinning}
        />
      ))}
    </div>
  );
};
export default Slots;
