import { useSelector } from "react-redux";
import { VisibilityContextProvider } from "./Context/NavVisibilityContext";
import { PreviewVisibilityContextProvider } from "./Context/PreviewVisibilityContext";
import MainHeader from "./components/header/Header";
import Display from "./components/markdownDisplay/MarkDownDisplay";

import { getCurrentTheme } from "./components/header/themeSlice";
import { useEffect } from "react";
import Main from "./components/markdownDisplay/Main";

function App() {
    const selectedTheme = useSelector(getCurrentTheme);

    useEffect(() => {
        document.body.style.backgroundColor = `${
            selectedTheme === "light" ? "#FFFFFF" : "#151619"
        }`;
    }, [selectedTheme]);

    return (
        <>
            <VisibilityContextProvider>
                <MainHeader />
                <PreviewVisibilityContextProvider>
                    <Main />
                </PreviewVisibilityContextProvider>
            </VisibilityContextProvider>
        </>
    );
}

export default App;
