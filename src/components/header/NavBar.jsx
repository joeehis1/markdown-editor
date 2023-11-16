import Logo from "./Logo";

import { useDispatch } from "react-redux";
import { addDoc } from "./documentSlice";
import { forwardRef } from "react";
import ColorModeToggle from "./ColorModeToggle";
import DocumentList from "./DocumentList";

const NavBar = forwardRef(({ logoLocation, navShown }, ref) => {
    const dispatch = useDispatch();

    return (
        <nav ref={ref} className={`docs-nav ${navShown ? "nav-shown" : ""}`}>
            {logoLocation === "nav-bar" ? <Logo href="./" /> : ""}
            <h2 className="nav-title app-heading-s">my documents</h2>
            <button
                onClick={() => dispatch(addDoc())}
                className="btn btn-accent btn-full-width app-heading-m"
            >
                +<span>New Document</span>
            </button>
            <DocumentList />
            <ColorModeToggle />
        </nav>
    );
});

NavBar.displayName = "NavBar";

export default NavBar;
