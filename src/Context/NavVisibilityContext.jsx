import { createContext, useState } from "react";
const VisibilityContext = createContext();

// eslint-disable-next-line react/prop-types
function VisibilityContextProvider({ children }) {
    const [navShown, setNavShown] = useState(false);

    function toggleNavShown() {
        setNavShown(!navShown);
    }

    function hideNavWithoutToggle() {
        setNavShown(false);
    }

    return (
        <VisibilityContext.Provider
            value={{
                navShown,
                toggleNavShown,
                hideNavWithoutToggle,
            }}
        >
            {children}
        </VisibilityContext.Provider>
    );
}

export { VisibilityContext, VisibilityContextProvider };
