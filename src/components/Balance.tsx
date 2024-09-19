interface BalanceProps {
  credits: number
}

const Balance = ({ credits }: BalanceProps) => {
  return (
    <p>You have: {credits} credits</p>
  )
}
export default Balance