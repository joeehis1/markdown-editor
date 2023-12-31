# Frontend Mentor - In-browser markdown editor solution

This is a solution to the [In-browser markdown editor challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/inbrowser-markdown-editor-r16TrrQX9). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

-   [Overview](#overview)
    -   [The challenge](#the-challenge)
    -   [Screenshot](#screenshot)
    -   [Links](#links)
-   [My process](#my-process)
    -   [Built with](#built-with)
    -   [What I learned](#what-i-learned)
    -   [Continued development](#continued-development)
    -   [Useful resources](#useful-resources)
-   [Author](#author)
-   [Acknowledgments](#acknowledgments)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

### The challenge

Users should be able to:

-   Create, Read, Update, and Delete markdown documents - done
-   Name and save documents to be accessed as needed - done
-   Edit the markdown of a document and see the formatted preview of the content - done
-   View a full-page preview of the formatted content - done
-   View the optimal layout for the app depending on their device's screen size - done
-   See hover states for all interactive elements on the page
-   **Bonus**: If you're building a purely front-end project, use localStorage to save the current state in the browser that persists when the browser is refreshed
-   **Bonus**: Build this project as a full-stack application

### Screenshot

![Dark Mode Menu Open](./screenshots/Desktop-dark-1.png)
![Mobile Menu Open](./screenshots/Mobile-2.png)
![Light Mode Delete Confirm](./screenshots/Mobile-light-4.png)
![Tablet Editor Open](./screenshots/Tablet-dark-2.png)
.[](./screenshots/Tablet-light-2.png)

### Links

-   Solution URL: [Markdown-Editor-Code](https://github.com/joeehis1/markdown-editor)
-   Live Site URL: [Markdown-Editor-Deployed](https://venerable-belekoy-9692bc.netlify.app/)

## My process

In summary, I started by getting the general skeleton of the project put together without a lot of functionality and then putting in the functionality bit by bit. The more challenging aspect was getting the delete functionality to work properly and also deciding on how to structure local storage persistence.

### Built with

-   Semantic HTML5 markup
-   SCSS/SASS
-   Flexbox
-   CSS Grid
-   Mobile-first workflow
-   [React](https://reactjs.org/) - JS library

### What I learned

This project was the my first opportunity to try out redux state management library. I learnt mainly using the documentation website and the youtube video by dave gray that is mostly based on the content from the tutorial. One thing that there is not a lot of coverage of is how to handle local storage persistence when doing statemanagement with redux as a result I decided to write my own functions for getting state from local storage. I found a way to do it after a bit of experimentation. I am actually proud of how my document slice turned out.

````js
import { createSlice } from "@reduxjs/toolkit";

const defaultMdPlaceHolder =
    "# Welcome to Markdown\n\nMarkdown is a lightweight markup language that you can use to add formatting elements to plaintext text documents.\n\n## How to use this?\n\n1. Write markdown in the markdown editor window\n2. See the rendered markdown in the preview window\n\n### Features\n\n- Create headings, paragraphs, links, blockquotes, inline-code, code blocks, and lists\n- Name and save the document to access again later\n- Choose between Light or Dark mode depending on your preference\n\n> This is an example of a blockquote. If you would like to learn more about markdown syntax, you can visit this [markdown cheatsheet](https://www.markdownguide.org/cheat-sheet/).\n\n#### Headings\n\nTo create a heading, add the hash sign (#) before the heading. The number of number signs you use should correspond to the heading level. You'll see in this guide that we've used all six heading levels (not necessarily in the correct way you should use headings!) to illustrate how they should look.\n\n##### Lists\n\nYou can see examples of ordered and unordered lists above.\n\n###### Code Blocks\n\nThis markdown editor allows for inline-code snippets, like this: `<p>I'm inline</p>`. It also allows for larger code blocks like this:\n\n```\n<main>\n  <h1>This is a larger code block</h1>\n</main>\n```";

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
````

This was also another opportunity for me to try out programatically generating styles using SCSS. I used this method mainly for the text styles. Its nothing too complicated but see below:

```css
$app-sizes: "heading-m" 0.9375rem 400, "heading-s" 0.875rem 500,
    "body-s" 0.8125rem 300, "body-m" 0.8125rem 300;

$preview-sizes: (
    "1": 2rem,
    "2": 1.75rem,
    "3": 1.5rem,
    "4": 1.25rem,
    "5": 1rem,
    "6": 0.875,
);

@each $name, $size, $weight in $app-sizes {
    .app-#{$name} {
        font-size: $size;
        font-weight: $weight;
        @if $name == "heading-s" {
            letter-spacing: 0.125rem;
        } @else {
            letter-spacing: normal;
        }
    }
}

@each $level, $size in $preview-sizes {
    .preview-heading-#{$level} {
        font-size: $size;
        @if $level == "6" {
            color: $accent;
        } @else {
            color: $black-700;
        }
        font-weight: 700;
    }
}
```

### Continued development

I have some ways to go in learning redux. I also intend to pick up typescript. I also intend on picking up server side programming using PHP so that I will eventually be able to build out these projects as full stack applications. Long road ahead.

### Useful resources

-   [Dave Gray, Redux Tutorial](https://www.youtube.com/watch?v=NqzdVN2tyvQ&t=965s) - This is more or less the video version of the redux documentation without the complicated mental leaps you'll have to take. I'd recommend it to anyone that is just getting started with redux to read the documentation while working through the video.
-   [Tania Rascia](https://www.taniarascia.com/redux-react-guide/) - I'd recommend you bookmark her entire website. It is basically an education in everything web development. Without her site, I most certainly would have abandoned redux as a whole.

## Author

-   Website - [Joseph Ehigiator](https://benevolent-torte-3514dd.netlify.app/#)
-   Frontend Mentor - [@joeehis1](https://www.frontendmentor.io/profile/joeehis1)
