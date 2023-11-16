import { createContext, useState } from "react";

const PreviewVisibilityContext = createContext();

function PreviewVisibilityContextProvider({ children }) {
    const [smallPreviewVisible, setSmallPreviewVisible] = useState(false);
    const [largePreviewVisible, setLargePreviewVisible] = useState(false);

    function toggleSmallPreview() {
        setSmallPreviewVisible(!smallPreviewVisible);
    }

    function toggleLargePreview() {
        setLargePreviewVisible(!largePreviewVisible);
    }

    return (
        <PreviewVisibilityContext.Provider
            value={{
                smallPreviewVisible,
                toggleSmallPreview,
                largePreviewVisible,
                toggleLargePreview,
            }}
        >
            {children}
        </PreviewVisibilityContext.Provider>
    );
}

export { PreviewVisibilityContext, PreviewVisibilityContextProvider };
