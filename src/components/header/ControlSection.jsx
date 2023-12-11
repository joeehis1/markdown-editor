import menuIcon from "../../assets/icons/icon-menu.svg";
import closeIcon from "../../assets/icons/icon-close.svg";

import Logo from "./Logo";
import MenuToggle from "./MenuToggle";

import { VisibilityContext } from "../../Context/NavVisibilityContext";

import NameEditor from "./NameEditor";
import { useContext } from "react";

// eslint-disable-next-line react/prop-types
export default function ControlSection({ logoLocation }) {
    const { navShown, toggleNavShown } = useContext(VisibilityContext);
    return (
        <section className="controls">
            <MenuToggle
                icon={navShown ? closeIcon : menuIcon}
                handleClick={toggleNavShown}
            />
            {logoLocation === "header" ? <Logo className="logo" /> : ""}
            <NameEditor />
        </section>
    );
}
