export default function parseTextElement(textElement) {
    // Parses a block-based text element and return the correct html element

    if (textElement.type === 'paragraph') {


        return (<p>{textElement.children.map((el) => el.text)}</p>)
    }

    if (textElement.type === 'heading1') {
        return <h1 className="text-2xl font-bold my-4">{textElement.text}</h1>;
    }

    if (textElement.type === 'heading2') {
        return <h2 className="text-xl font-bold my-3">{textElement.text}</h2>;
    }

    if (textElement.type === 'heading3') {
        return <h3 className="text-lg font-bold my-2">{textElement.text}</h3>;
    }

    if (textElement.type === 'bulleted-list') {
        return (
            <ul className="list-disc list-inside my-2">
                {textElement.items.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        );
    }

    if (textElement.type === 'numbered-list') {
        return (
            <ol className="list-decimal list-inside my-2">
                {textElement.items.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ol>
        );
    }

    // Default case: return a paragraph if type is unrecognized
    return <p>{textElement.text}</p>;
}