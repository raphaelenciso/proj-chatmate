export const Button = ({ text }) => {
  return (
    <button className="bg-secondary-main p-2 font-bold hover:cursor-pointer hover:opacity-80 text-white rounded-lg">
      {text}
    </button>
  );
};
