const ErrorMessage: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div className="my-4 text-danger text-sm tracking-wider">{message}</div>
  );
};

export default ErrorMessage;
