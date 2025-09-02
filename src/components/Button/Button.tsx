import "./Button.styles.css";

export type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export default function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      type="button"
      className={className ? `button ${className}` : "button"}
      {...props}
    >
      {children}
    </button>
  );
}
