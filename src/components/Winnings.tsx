interface WinningsProps {
  winnings: number
}

const Winnings = ({winnings}: WinningsProps) => {
  return (
    <h2 className="text-white text-lg font-bold mb-2">Winnings: ${winnings}</h2>
  );
};
export default Winnings;
