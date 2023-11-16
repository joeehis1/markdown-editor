import { forwardRef } from "react";
import { useSelector } from "react-redux";
import { getCurrentTheme } from "./themeSlice";

// eslint-disable-next-line react/prop-types
const Dialog = forwardRef(({ documentName, deleteFromList }, ref) => {
    const currentTheme = useSelector(getCurrentTheme);
    return (
        <dialog
            ref={ref}
            className={`dialog-delete ${
                currentTheme === "dark" ? "dark-mode" : ""
            }`}
        >
            <div className="dialog-elements">
                <h3 className="preview-heading-4">Delete this document</h3>
                <p>
                    Are you sure you want to delete the &quot;
                    {documentName}&quot; document and its contents? This action
                    cannot be reversed.
                </p>
                <button
                    className="btn btn-accent btn-full-width"
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        deleteFromList();
                    }}
                >
                    Confirm & delete
                </button>
            </div>
        </dialog>
    );
});

Dialog.displayName = "Dialog";
export default Dialog;
