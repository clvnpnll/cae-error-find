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
    "disabled:hover:bg-slate-100 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed";
  const alignClass =
    align == "center"
      ? "justify-center"
      : align == "right"
      ? "justify-end"
      : "justify-start";

  return (
    <button
      disabled={disabled}
      className={`flex w-full px-16 py-4 bg-slate-50 hover:bg-slate-100 font-medium uppercase border-y 
        ${disabledClass} ${alignClass} ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
