const ErrorMessage = ({ error }: { error: string }) => {
  return (
    <div className="flex flex-col items-center mt-[200px] gap-5 font-bold">
      <p className="text-8xl opacity-80">=(</p>
      <p className="text-red-400 opacity-80 mt-10 text-center text-lg">
        {error}
      </p>
    </div>
  );
};

export default ErrorMessage;
