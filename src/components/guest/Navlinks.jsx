"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Navlinks = ({ navLinks, session }) => {
  const path = usePathname();
  return (
    <nav>
      <ul className="flex gap-10">
        {navLinks.map((item, i) => (
          <li
            key={i}
            className={`${
              path === item.href ? "text-primary font-semibold" : ""
            } ${i === 1 && !session ? "hidden" : ""} hover:text-primary`}
          >
            <Link href={item.href}>{item.text}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navlinks;
