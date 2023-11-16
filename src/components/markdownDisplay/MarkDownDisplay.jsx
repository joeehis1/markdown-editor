import { useRef, useEffect } from "react";
import { Converter } from "showdown";

// eslint-disable-next-line react/prop-types
export default function MarkDownDisplay({ text }) {
    const sectionRef = useRef(null);
    useEffect(() => {
        const classMap = {
            h1: "preview-heading-1",
            h2: "preview-heading-2",
            h3: "preview-heading-3",
            h4: "preview-heading-4",
            h5: "preview-heading-5",
            h6: "preview-heading-6",
        };

        const bindings = Object.keys(classMap).map((key) => {
            return {
                type: "output",
                regex: new RegExp(`<${key}(.*)>`, "g"),
                replace: `<${key} class="${classMap[key]}" $1>`,
            };
        });

        const converter = new Converter({
            extensions: [...bindings],
        });

        const html = converter.makeHtml(text);
        sectionRef.current.innerHTML = html;
    }, [text]);

    return <div className="content" ref={sectionRef}></div>;
}

//
