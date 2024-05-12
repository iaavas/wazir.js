export const Button = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) => {
  return (
    <button
      className="bg-green-700 hover:bg-green-900 text-white font-bold py-4 px-8 rounded text-2xl"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
