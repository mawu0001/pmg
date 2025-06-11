import Link from "next/link";

const Button = ({ title, link }) => {
  return (
    <Link href={`/${link}`}>
      <button className="px-6 py-2 bg-red-600 text-white rounded-full transition hover:bg-black">
        {title}
      </button>
    </Link>
  );
};

export default Button;
