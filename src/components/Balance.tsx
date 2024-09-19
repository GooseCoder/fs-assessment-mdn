interface BalanceProps {
  credits: number;
}

const Balance = ({ credits }: BalanceProps) => {
  return (
    <h2 className=" text-white text-lg font-bold mb-2">Credits: ${credits}</h2>
  );
};
export default Balance;
