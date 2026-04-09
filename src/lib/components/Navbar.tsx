import LangSwitcher from "./LangSwitcher";
import ThemeToggle from "./ThemeToggle";
import MenuItems from "./MenuItems";
import { MENU_ITEMS } from "../constans/menuItems";

const Navbar = () => {
  return (
    <nav className="topNavbar navContainer">
      <MenuItems className="navList" menuItems={MENU_ITEMS} />
      <MenuItems
        className="mobileNavList navContainer"
        menuItems={MENU_ITEMS}
        isHamburgerVisible={true}
      />

      <section className="btnContainer ">
        <button className="btn btn-primary">Call to Action</button>
        <ThemeToggle />
        <LangSwitcher />
      </section>
    </nav>
  );
};

export default Navbar;
