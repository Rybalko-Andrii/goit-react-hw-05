import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="flex justify-center bg-green-300/50 rounded-b-lg px-4 py-2 overflow-x-hidden">
      <ul className="flex flex-wrap justify-center gap-8">
        <li>
          <NavLink
            to="/"
            className="block rounded-3xl bg-cyan-800 text-xl text-amber-100 px-4 py-2 hover:scale-105"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/movies"
            className="block rounded-3xl bg-cyan-800 text-xl text-amber-100 px-4 py-2 hover:scale-105"
          >
            Movies
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
