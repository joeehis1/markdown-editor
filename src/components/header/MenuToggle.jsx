/* eslint-disable react/prop-types */
export default function MenuToggle({ icon, handleClick }) {
    return (
        <button
            onClick={() => handleClick()}
            className="btn btn-icon btn-transparent btn-menu"
            title="Click to show saved documents, add documents and switch between color themes"
            aria-label="Menu toggle button"
        >
            <img src={icon} alt="" />
        </button>
    );
}
