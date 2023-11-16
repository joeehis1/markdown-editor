/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { getCurrentTheme } from "../header/themeSlice";
import PreviwerToggle from "./PreviewToggler";
import PreviewIcon from "../svg/PreviewIcon";

export default function Heading({ title, previewShown, toggler }) {
    const currentTheme = useSelector(getCurrentTheme);

    return (
        <h2
            className={`heading app-heading-s ${
                currentTheme === "dark" ? "dark-mode" : ""
            }`}
        >
            {title}
            {toggler ? (
                <PreviwerToggle
                    icon={
                        previewShown ? (
                            <PreviewIcon status="active" />
                        ) : (
                            <PreviewIcon />
                        )
                    }
                    toggle={() => toggler()}
                />
            ) : (
                ""
            )}
        </h2>
    );
}
