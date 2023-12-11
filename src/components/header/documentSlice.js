import { createSlice } from "@reduxjs/toolkit";

const defaultMdPlaceHolder =
    "# Welcome to Markdown\n\nMarkdown is a lightweight markup language that you can use to add formatting elements to plaintext text documents.\n\n## How to use this?\n\n1. Write markdown in the markdown editor window\n2. See the rendered markdown in the preview window\n\n### Features\n\n- Create headings, paragraphs, links, blockquotes, inline-code, code blocks, and lists\n- Name and save the document to access again later\n- Choose between Light or Dark mode depending on your preference\n\n> This is an example of a blockquote. If you would like to learn more about markdown syntax, you can visit this [markdown cheatsheet](https://www.markdownguide.org/cheat-sheet/).\n\nYou can also make text **bold**...\nOr _italic_\nOr **_both!_**\nPossibly if you want to ~~cross out stuff~~.\n\n\n\n#### Headings\n\nTo create a heading, add the hash sign (#) before the heading. The number of number signs you use should correspond to the heading level. You'll see in this guide that we've used all six heading levels (not necessarily in the correct way you should use headings!) to illustrate how they should look.\n\n##### Lists\n\nYou can see examples of ordered and unordered lists above.\n\n###### Code Blocks\n\nThis markdown editor allows for inline-code snippets, like this: `<p>I'm inline</p>`. It also allows for larger code blocks like this:\n\n```\n<main>\n  <h1>This is a larger code block</h1>\n</main>\n```\n#####Image Shown below\n\n![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)";

function saveToLocal(docs, selectedId) {
    localStorage.setItem("saved-docs", JSON.stringify(docs));
    localStorage.setItem("selected-id", JSON.stringify(selectedId));
}

function getFromLocal() {
    const savedDocs = JSON.parse(localStorage.getItem("saved-docs"));
    const selectedId = JSON.parse(localStorage.getItem("selected-id"));
    const id = "3e27e830-5db9-45c5-a78a-4fafe2ec1200";
    const createdAt = new Date().toLocaleDateString();
    if (!savedDocs || savedDocs.length <= 0) {
        return {
            docs: [
                {
                    id,
                    createdAt,
                    content: defaultMdPlaceHolder,
                    name: "welcome",
                },
            ],
            selectedDocumentId: id,
        };
    }
    return {
        docs: savedDocs,
        selectedDocumentId: selectedId,
    };
}

const initialState = {
    docs: getFromLocal().docs,
    selectedDocumentId: getFromLocal().selectedDocumentId,
};

const documentSlice = createSlice({
    name: "docs",
    initialState,
    reducers: {
        addDoc(state) {
            const today = new Date();
            const createdAt = today.toLocaleDateString();

            const newDocument = {
                id: window.crypto.randomUUID(),
                createdAt,
                name: `untitled-document-${
                    state.docs.length ? state.docs.length + 1 : 1
                }.md`,
                content: defaultMdPlaceHolder,
            };
            state.docs.push(newDocument);
            state.selectedDocumentId = newDocument.id;
            saveToLocal(state.docs, state.selectedDocumentId);
        },

        selectDoc(state, { payload }) {
            state.selectedDocumentId = payload.id;
            saveToLocal(state.docs, state.selectedDocumentId);
        },
        saveNewName(state, { payload }) {
            state.docs = state.docs.map((doc) => {
                if (doc.id === payload.id) {
                    return {
                        ...doc,
                        name: payload.newName,
                    };
                }
                return doc;
            });
            saveToLocal(state.docs);
            saveToLocal(state.docs, state.selectedDocumentId);
        },
        saveNewMarkdown(state, { payload }) {
            state.docs = state.docs.map((doc) => {
                if (doc.id === payload.id) {
                    return {
                        ...doc,
                        content: payload.markdown,
                    };
                }
                return doc;
            });
            saveToLocal(state.docs);
            saveToLocal(state.docs, state.selectedDocumentId);
        },
        deleteDocument(state, { payload }) {
            const newDocs = state.docs.filter(
                (doc) => doc.id !== payload.docId
            );
            state.docs = newDocs;
            state.selectedDocumentId =
                newDocs.length > 0 ? newDocs[newDocs.length - 1].id : null;
            saveToLocal(state.docs, state.selectedDocumentId);
        },
    },
});

export const {
    addDoc,
    selectDoc,
    saveNewName,
    saveNewMarkdown,
    deleteDocument,
} = documentSlice.actions;

export function selectDocuments(state) {
    return state.documents.docs;
}

export function getSelectedDocId(state) {
    return state.documents.selectedDocumentId;
}

export default documentSlice.reducer;
