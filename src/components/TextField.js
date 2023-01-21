export const TextField = ({ type, placeholder }) => {
  return (
    <input
      type={type}
      className="p-2 border-b border-b-dark-text-primary bg-dark-bg-neutral-lighter text-dark-text-primary focus:outline-none focus:border-b-2 focus:border-primary-main placeholder:focus:text-[12px] placeholder:focus:absolute placeholder:focus:top-0"
      placeholder={placeholder}
      required
    />
  );
};
