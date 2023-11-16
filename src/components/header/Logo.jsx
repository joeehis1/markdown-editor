import logo from "../../assets/icons/logo.svg";

export default function Logo({ ...props }) {
    return (
        <h1 style={{ margin: 0 }} aria-label="MARKDOWN" {...props}>
            <img src={logo} alt="" />
        </h1>
    );
}
