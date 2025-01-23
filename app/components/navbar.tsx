const Navbar = () => {
  return (
    <div className="flex flex-row justify-between border-b-slate-700 px-20 py-4 shadow-sm">
      <div className="flex flex-row items-center gap-3">
        <img src="/sigma.jpg" alt="sigma" className="h-10 w-10 rounded-full" />
        <p className="text-xl font-bold text-zinc-700">Test Application</p>
      </div>
      <div className="flex flex-row items-center gap-3">
        <a href="/auth/login">
          <button className="rounded-md bg-zinc-800 px-4 py-2 text-white">
            Login
          </button>
        </a>
        <a href="/auth/signup">
          <button className="rounded-md bg-zinc-800 px-4 py-2 text-white">
            Register
          </button>
        </a>
      </div>
    </div>
  );
};

// const MenuItem = ({ label, href }: { label: string; href: string }) => (
//   <a href={href} className="flex px-4 cursor-pointer hover:text-slate-500">
//     {label}
//   </a>
// );

export default Navbar;
