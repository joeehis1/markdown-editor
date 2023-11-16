/* eslint-disable react/prop-types */
import { useContext } from "react";
import { PreviewVisibilityContext } from "../../Context/PreviewVisibilityContext";
import useResize from "../../Hook/useResize";
import { useSelector } from "react-redux";
import { getCurrentTheme } from "../header/themeSlice";
import Heading from "./Heading";
import MarkDownDisplay from "./MarkDownDisplay";

export default function Preview({ markDown }) {
    const { smallPreviewVisible, largePreviewVisible, toggleLargePreview } =
        useContext(PreviewVisibilityContext);

    const { isWider } = useResize(448);
    const currentTheme = useSelector(getCurrentTheme);

    return (
        <div
            className={`preview ${currentTheme === "dark" ? "dark-mode" : ""} ${
                !isWider && smallPreviewVisible ? "visible" : ""
            }`}
        >
            {isWider && (
                <Heading
                    title={"Preview"}
                    previewShown={largePreviewVisible}
                    toggler={toggleLargePreview}
                />
            )}
            <MarkDownDisplay text={markDown} />
        </div>
    );
}
