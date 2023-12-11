/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import trashIcon from "../../assets/icons/icon-delete.svg";
import saveIcon from "../../assets/icons/icon-save.svg";
import documentIcon from "../../assets/icons/icon-document.svg";
import { deleteDocument, saveNewName, selectDocuments } from "./documentSlice";
import { useEffect, useRef, useState } from "react";
import Dialog from "./Dialog";

export default function Form({ docId }) {
    const [editing, setEditing] = useState(false);

    const docs = useSelector(selectDocuments);
    const doc = docs.find((doc) => doc.id === docId);

    const [documentName, setDocumentName] = useState(doc?.name);
    const dispatch = useDispatch();

    const deleteDialogRef = useRef(null);

    function handleSubmit() {
        setEditing(false);
        if (!documentName.trim()) {
            setDocumentName(doc.name);
        } else {
            const name = !documentName.endsWith(".md")
                ? `${documentName}.md`
                : documentName;
            dispatch(saveNewName({ id: docId, newName: name }));
            setDocumentName(name);
        }
    }

    function openDialog() {
        deleteDialogRef.current.showModal();
    }

    function closeDialog() {
        deleteDialogRef.current.close();
    }

    function deleteFromList() {
        dispatch(deleteDocument({ docId }));
    }

    useEffect(() => {
        function closeOnClickOutside(e) {
            if (
                deleteDialogRef.current &&
                deleteDialogRef.current.open &&
                e.target.nodeName === "DIALOG"
            ) {
                closeDialog();
            }
        }
        window.addEventListener("click", closeOnClickOutside);
        return () => window.removeEventListener("click", closeOnClickOutside);
    }, []);

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }}
            className="doc-name-editor"
        >
            <div className="doc-title">
                <h2 className="doc-name app-body-m">Document Name</h2>
                <img src={documentIcon} alt="" />
                <label
                    onClick={(e) => {
                        e.stopPropagation();
                        setEditing(true);
                    }}
                    className="app-heading-m"
                >
                    {editing ? (
                        <input
                            className="app-heading-m"
                            type="text"
                            value={documentName}
                            onChange={(e) => setDocumentName(e.target.value)}
                        />
                    ) : (
                        documentName
                    )}
                </label>
            </div>
            <Dialog
                ref={deleteDialogRef}
                documentName={documentName}
                deleteFromList={deleteFromList}
                closeDialog={closeDialog}
            />
            <button
                type="button"
                onClick={() => openDialog()}
                className="btn btn-transparent btn-icon btn-delete"
                title={`Click to delete the selected document "${documentName}"`}
                aria-label="Delete button"
            >
                <img src={trashIcon} alt="" />
            </button>
            <button className="btn btn-accent btn-icon btn-save">
                <img src={saveIcon} alt="" />
                <span className="button-text app-type-large">Save Changes</span>
            </button>
        </form>
    );
}
