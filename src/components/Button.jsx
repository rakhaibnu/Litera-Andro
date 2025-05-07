import { Link } from "react-router-dom";

export default function Button({ text, onClick, to, className = "" , leftIcon, rightIcon }) {
  const defaultButtonClass = "font-lato py-2 px-4 rounded-full hover:bg-dark-700 transition duration-300";
  const buttonClass = className ? `${defaultButtonClass} ${className}` : defaultButtonClass;

  if (to) {
    return (
      <Link to={to} onClick={onClick} className={buttonClass}>
        {text}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={buttonClass}>
      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      {text}
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
}