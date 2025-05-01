interface ButtonProps {
  label: string;
  align?: "left" | "center" | "right";
  className?: string;
  disabled?: boolean;
  onClick: () => void;
}

const Button = (props: ButtonProps) => {
  const { onClick, label, align = "left", disabled = false, className } = props;
  const disabledClass =
    "disabled:hover:bg-gray-300 disabled:bg-gray-300 disabled:cursor-not-allowed";
  const alignClass =
    align == "center"
      ? "justify-center"
      : align == "right"
      ? "justify-end"
      : "justify-start";

  return (
    <button
      disabled={disabled}
      className={`flex w-full px-14 py-4 text-white bg-teal-500 hover:bg-teal-600 font-medium uppercase border-y 
        ${disabledClass} ${alignClass} ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
