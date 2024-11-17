interface ButtonProps {
  label: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  onClick: () => void;
}

const Button = ({ onClick, label, align = "left", className}: ButtonProps) => {
  const alignClass = align == "center" ? "justify-center" : align == "right" ? "justify-end" : "justify-start";

  return (
    <button
      className={
        `flex w-full px-16 py-4 bg-slate-50 hover:bg-slate-100 font-medium uppercase border-y 
        ${alignClass} ${className}`
      }
      onClick={onClick} 
    >
      {label}
    </button>
  )
}

export default Button