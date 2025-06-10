const Button = ({ title, link }) => {
  return (
    <a
      href={`/${link}`}
      className="inline-block px-6 py-2 bg-red-600 text-white rounded-full  transition"
    >
      {title}
    </a>
  );
};

export default Button;
