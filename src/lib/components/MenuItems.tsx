import { useState } from "react";
import { NavLink } from "react-router";
import { toggleSetter } from "../utils/toggleSetter";

const MenuItems = ({
  className,
  menuItems,
  isHamburgerVisible: isBtnVisible = false,
}: {
  className: string;
  menuItems: { id: string; path: string; name: string }[];
  isHamburgerVisible?: boolean;
}) => {
  const [colapse, setColapse] = useState<boolean>(true);

  const handleClick = () => toggleSetter<boolean>(setColapse, true, false);
  return (
    <>
      <ul className={`${className} ${colapse ? "colapsed" : ""}`}>
        {menuItems.slice().map(({ id, path, name }) => (
          <li key={id}>
            <NavLink onClick={handleClick} to={path}>
              {name}
            </NavLink>
          </li>
        ))}
      </ul>
      {isBtnVisible && (
        <button onClick={handleClick} className="hamburger">
          {colapse ? "Hamburger" : "Zamknij"}
        </button>
      )}
    </>
  );
};

export default MenuItems;
