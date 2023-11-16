import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedTheme: window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : window.matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "light",
};

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        changeTheme(state) {
            state.selectedTheme =
                state.selectedTheme === "light" ? "dark" : "light";
        },
    },
});

export const { changeTheme } = themeSlice.actions;

export function getCurrentTheme(state) {
    return state.theme.selectedTheme;
}

export default themeSlice.reducer;
