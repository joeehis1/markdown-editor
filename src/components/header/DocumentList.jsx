import { useSelector } from "react-redux";
import Document from "./Document";
import { selectDocuments } from "./documentSlice";

export default function DocumentList() {
    const documents = useSelector(selectDocuments);

    return (
        <ul className="unstyled-list">
            {documents.map((document) => {
                return (
                    <Document
                        createdAt={document.createdAt}
                        name={document.name}
                        key={document.id}
                        id={document.id}
                    />
                );
            })}
        </ul>
    );
}
