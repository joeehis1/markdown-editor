/* eslint-disable react/prop-types */
export default function PreviwerToggle({ icon, toggle }) {
    return (
        <button
            onClick={() => toggle()}
            className="btn btn-icon btn-transparent btn-preview"
            title="Click to show or hide rendered HTML"
            aria-label="HTML Preview button"
        >
            {icon}
        </button>
    );
}
