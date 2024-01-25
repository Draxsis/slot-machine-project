import './button.css';

// Custom Button Component
const Button = ({ onClick, disabled, children }) => (
  <button className="button" onClick={onClick} disabled={disabled}>
    {children}
  </button>
);

export default Button;
