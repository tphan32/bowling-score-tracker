interface ButtonProps {
  onClick?: () => void;
  label: string;
  disabled?: boolean;
  type?: "submit" | "reset" | "button" | undefined;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  label,
  disabled = false,
  type = "button",
}) => {
  return (
    <button
      onClick={onClick}
      className="rounded-lg bg-slate-600 text-white px-2.5 py-1.5 text-xs cursor-pointer h-fit w-fit disabled:opacity-50"
      disabled={disabled}
      type={type}
    >
      {label}
    </button>
  );
};

export default Button;
