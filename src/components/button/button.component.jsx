const Button = ({ clickHandler, children: text, ...rest }) => {
  return (
    <button {...rest} onClick={clickHandler}>
      {text}
    </button>
  );
};

export default Button;
