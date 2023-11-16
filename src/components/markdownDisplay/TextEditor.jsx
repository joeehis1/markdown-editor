/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { getCurrentTheme } from "../header/themeSlice";
import { PreviewVisibilityContext } from "../../Context/PreviewVisibilityContext";
import { useContext } from "react";
import useResize from "../../Hook/useResize";
import Heading from "./Heading";

export default function TextEditor({ markdown, handleChange }) {
    const currentTheme = useSelector(getCurrentTheme);
    const { smallPreviewVisible } = useContext(PreviewVisibilityContext);
    const { isWider } = useResize(448);
    return (
        <div
            className={`editor ${currentTheme === "dark" ? "dark-mode" : ""} ${
                !isWider && smallPreviewVisible ? "hidden" : ""
            }`}
        >
            {isWider && <Heading title={"Editor"} />}
            <textarea
                aria-label="Markdown Editor"
                className="markdown-code"
                value={markdown}
                onChange={(e) => {
                    handleChange(e.target.value);
                }}
            />
        </div>
    );
}
