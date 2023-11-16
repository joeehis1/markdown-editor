import { useContext } from "react";
import { useSelector } from "react-redux";
import useResize from "../../Hook/useResize";
import { PreviewVisibilityContext } from "../../Context/PreviewVisibilityContext";
import ShownIfEmpty from "./ShownIfEmpty";
import Heading from "./Heading";
import ShownItems from "./ShownItems";
import { getSelectedDocId } from "../header/documentSlice";
import { VisibilityContext } from "../../Context/NavVisibilityContext";

export default function Main() {
    const selectedDocId = useSelector(getSelectedDocId);

    const docId = selectedDocId;

    const { navShown } = useContext(VisibilityContext);

    const { isWider } = useResize(448);

    const { smallPreviewVisible, toggleSmallPreview } = useContext(
        PreviewVisibilityContext
    );

    return (
        <main>
            <>
                {!docId ? (
                    <ShownIfEmpty />
                ) : (
                    <article
                        className={`display ${navShown ? "nav-shown" : ""}`}
                    >
                        {!isWider && (
                            <Heading
                                title={
                                    !smallPreviewVisible ? "Editor" : "Preview"
                                }
                                previewShown={smallPreviewVisible}
                                toggler={toggleSmallPreview}
                            />
                        )}
                        <ShownItems key={docId} docId={docId} />
                    </article>
                )}
            </>
        </main>
    );
}
