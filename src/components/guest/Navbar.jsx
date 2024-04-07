import { getServerSession } from "next-auth";
import Navlinks from "./Navlinks";
import Container from "../global/Container";
import AvatarDropDown from "../global/AvatarDropDown";
import SignInButton from "../global/SignInButton";

const navLinks = [
  {
    text: "Home",
    href: "/",
  },
  {
    text: "Dashboard",
    href: "/dashboard",
  },
  {
    text: "About",
    href: "/about",
  },
  {
    text: "Contact",
    href: "/contact",
  },
];

const Navbar = async () => {
  const session = await getServerSession();

  return (
    <section className="w-full h-[8vh] flex justify-center items-center">
      <Container className="min-w-[1220px] h-full flex justify-between items-center">
        <div className="cursor-pointer overflow-hidden">
          <h2 className="font-bold text-lg">
            Space<span className="text-primary">.</span>
          </h2>
        </div>
        <div className="">
          <Navlinks navLinks={navLinks} session={session?.user} />
        </div>
        <div className="flex gap-5 cursor-pointer">
          {session?.user ? (
            <AvatarDropDown session={session?.user} />
          ) : (
            <SignInButton />
          )}
        </div>
      </Container>
    </section>
  );
};

export default Navbar;
