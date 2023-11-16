import { useContext, useEffect, useRef } from "react";

import NavBar from "./NavBar";
import ControlSection from "./ControlSection";
import { VisibilityContext } from "../../Context/NavVisibilityContext";
import useResize from "../../Hook/useResize";

export default function MainHeader() {
    const { navShown } = useContext(VisibilityContext);

    const { isWider } = useResize(1168.96);
    const logoLocation = isWider ? "header" : "nav-bar";

    const navbarRef = useRef(null);
    const headerRef = useRef(null);
    const { hideNavWithoutToggle } = useContext(VisibilityContext);

    useEffect(() => {
        function hideOnOutsideClick(e) {
            if (
                navShown &&
                navbarRef.current &&
                headerRef.current &&
                !navbarRef.current.contains(e.target) &&
                !headerRef.current.contains(e.target)
            ) {
                hideNavWithoutToggle();
            }
        }

        function hideOnKeyPress(e) {
            if (e.key === "Escape" && navShown) {
                hideNavWithoutToggle();
            }
        }

        window.addEventListener("keydown", hideOnKeyPress);

        window.addEventListener("click", hideOnOutsideClick);

        return () => {
            window.removeEventListener("click", hideOnOutsideClick);
            window.removeEventListener("keydown", hideOnKeyPress);
        };
    }, [navShown, hideNavWithoutToggle]);

    return (
        <header
            ref={headerRef}
            className={`${logoLocation === "header" ? "logo-in-header" : ""} ${
                navShown ? "nav-shown" : ""
            }`}
        >
            <ControlSection logoLocation={logoLocation} />
            <NavBar
                ref={navbarRef}
                logoLocation={logoLocation}
                navShown={navShown}
            />
        </header>
    );
}
