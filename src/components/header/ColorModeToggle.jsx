import { useDispatch, useSelector } from "react-redux";
import { changeTheme, getCurrentTheme } from "./themeSlice";
import LightModeIcon from "../svg/LightModeIcon";
import DarkModeIcon from "../svg/DarkModeIcon";

export default function ColorModeToggle() {
    const selectedTheme = useSelector(getCurrentTheme);
    const dispatch = useDispatch();

    function toggleChange() {
        dispatch(changeTheme());
    }

    return (
        <div className="color-mode-toggle">
            <LightModeIcon lightModeActive={selectedTheme === "light"} />
            <button
                onClick={() => toggleChange()}
                className={`btn btn-dark-light ${
                    selectedTheme === "light" ? "light" : ""
                }`}
            >
                <div className="circle"></div>
            </button>
            <DarkModeIcon darkModeActive={selectedTheme === "dark"} />
        </div>
    );
}