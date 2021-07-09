import cn from "classnames";
import css from "./Button.module.css";
function Button({ onClick, children, variant, className, ...rest }) {
  return (
    <button
      onClick={onClick}
      className={cn(css.base, css[variant], className)}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
