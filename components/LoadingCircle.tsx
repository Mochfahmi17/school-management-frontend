const LoadingCircle = ({ className }: { className: string }) => {
  return (
    <div
      className={`${className} animate-spin rounded-full border-2 border-t-transparent`}
    />
  );
};

export default LoadingCircle;
