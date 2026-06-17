interface AdjustButtonProps {
  amount: number;
  onClick: (amount: number) => void;
  disabled: boolean;
}

export default function AdjustButton({ amount, onClick, disabled }: AdjustButtonProps) {
  return (
    <button
      type="button"
      onClick={() => onClick(amount)}
      className="font-suit-bold w-20 rounded-full bg-gray-200 px-2 py-1 text-base"
      disabled={disabled}
    >
      {amount > 0 ? `+ ${amount}` : `- ${Math.abs(amount)}`}
    </button>
  );
}
