export default function MenuToggle({ icon, handleClick }) {
    return (
        <button
            onClick={() => handleClick()}
            className="btn btn-icon btn-transparent btn-menu"
        >
            <img src={icon} />
        </button>
    );
}
