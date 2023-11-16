/* eslint-disable react/prop-types */
import { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PreviewVisibilityContext } from "../../Context/PreviewVisibilityContext";
import { saveNewMarkdown, selectDocuments } from "../header/documentSlice";
import useResize from "../../Hook/useResize";
import TextEditor from "./TextEditor";
import Preview from "./Preview";

export default function ShownItems({ docId }) {
    const { largePreviewVisible } = useContext(PreviewVisibilityContext);
    const docs = useSelector(selectDocuments);
    const doc = docs.find((doc) => doc.id === docId);
    const markDownContent = doc?.content;
    const [newMarkDown, setNewMarkDown] = useState(markDownContent);
    const { isWider } = useResize(448);
    const dispatch = useDispatch();

    const timeoutRef = useRef(null);

    useEffect(() => {
        timeoutRef.current = setTimeout(() => {
            if (markDownContent === newMarkDown) {
                clearTimeout(timeoutRef.current);
            } else {
                dispatch(
                    saveNewMarkdown({
                        id: docId,
                        markdown: newMarkDown,
                    })
                );
            }
        }, 1500);

        return () => clearTimeout(timeoutRef.current);
    }, [dispatch, markDownContent, newMarkDown, docId]);

    return (
        <section
            className={`shown-items ${
                isWider && largePreviewVisible ? "preview-visible" : ""
            }`}
        >
            <TextEditor
                markdown={newMarkDown}
                handleChange={(val) => {
                    setNewMarkDown(val);
                }}
            />
            <Preview markDown={newMarkDown} />
        </section>
    );
}
