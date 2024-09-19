import { Symbol } from "./types";

interface SlotsProps {
  slots: Symbol[]
}

const Slots = ({ slots }: SlotsProps) => {
  return (
    <div style={{ fontSize: "48px", margin: "20px 0" }}>
      {slots.map((symbol, index) => (
        <span key={index} style={{ margin: "0 10px" }}>
          {symbol || "❓"}
        </span>
      ))}
    </div>
  );
};
export default Slots;
