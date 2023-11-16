/* eslint-disable react/prop-types */
export default function PreviwerToggle({ icon, toggle }) {
    return (
        <button
            onClick={() => toggle()}
            className="btn btn-icon btn-transparent btn-preview"
        >
            {icon}
        </button>
    );
}
