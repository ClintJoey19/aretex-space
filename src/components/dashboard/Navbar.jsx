import AvatarDropDown from "../global/AvatarDropDown";
import { getServerSession } from "next-auth";
import SignInButton from "../global/SignInButton";

const Navbar = async () => {
  const session = await getServerSession();
  return (
    <section className="h-[8vh] w-full flex justify-center items-center border bg-white">
      <div className="w-[95%] h-full px-2 flex items-center justify-between">
        <div className="cursor-pointer">
          <h2 className="font-bold">Space</h2>
        </div>
        <div className="h-full flex items-center cursor-pointer">
          {session.user ? (
            <AvatarDropDown session={session.user} />
          ) : (
            <SignInButton />
          )}
        </div>
      </div>
    </section>
  );
};

export default Navbar;
