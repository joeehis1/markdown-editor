import { useContext } from "react";
import { useSelector } from "react-redux";
import { getSelectedDocId, selectDocuments } from "../header/documentSlice";
import { VisibilityContext } from "../../Context/NavVisibilityContext";
import { getCurrentTheme } from "../header/themeSlice";

export default function ShownIfEmpty() {
    const currentTheme = useSelector(getCurrentTheme);
    const { navShown } = useContext(VisibilityContext);
    const selectedDocId = useSelector(getSelectedDocId);
    const docs = useSelector(selectDocuments);

    return (
        <section
            className={`shown-if-empty ${
                currentTheme === "dark" ? "dark-mode" : ""
            } ${navShown ? "nav-shown" : ""}`}
        >
            <h2>
                {!selectedDocId && !docs.length
                    ? "No Document Added. Create a new document by clicking on menu button and clicking the add button"
                    : !selectedDocId
                    ? "No Document Selected. Select a document by clicking on the menu button and clicking on a document"
                    : ""}
            </h2>
        </section>
    );
}
