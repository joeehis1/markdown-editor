import { configureStore } from "@reduxjs/toolkit";

import documentReducer from "./components/header/documentSlice";
import themeReducer from "./components/header/themeSlice";

const appStore = configureStore({
    reducer: {
        documents: documentReducer,
        theme: themeReducer,
    },
});

export default appStore;
