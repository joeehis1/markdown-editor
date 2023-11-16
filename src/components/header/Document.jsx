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
            >
                <img className="icon" src={documentIcon} alt="" />
                <p className="created-at app-body-m">{createdAt}</p>
                <h3 className="name app-heading-m">{name}</h3>
            </button>
        </li>
    );
}
