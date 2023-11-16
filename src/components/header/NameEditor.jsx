import { useSelector } from "react-redux";
import { getSelectedDocId } from "./documentSlice";
import Form from "./Form";

export default function NameEditor() {
    const selectedDocId = useSelector(getSelectedDocId);
    if (!selectedDocId) {
        return "";
    }

    return <Form key={selectedDocId} docId={selectedDocId} />;
}
