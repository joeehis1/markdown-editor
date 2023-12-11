import { useDispatch } from "react-redux";
import { selectDoc } from "./documentSlice";
import documentIcon from "../../assets/icons/icon-document.svg";

export default function Document({ createdAt, name, id }) {
    const dispatch = useDispatch();

    function select() {
        dispatch(selectDoc({ id }));
    }
    return (
        <li>
            <button
                onClick={() => select()}
                className="btn btn-transparent btn-select"
                title={`Click to view document "${name}"`}
            >
                <img className="icon" src={documentIcon} alt="" />
                <span className="created-at app-body-m">{createdAt}</span>
                <span className="name app-heading-m">{name}</span>
            </button>
        </li>
    );
}
