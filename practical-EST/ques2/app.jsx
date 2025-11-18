import React from "react";

function Child({ message }) {
    return <div>Child received: {message}</div>;
}

function Parent({ message }) {
    return (
        <div>
            <h2>Parent</h2>
            <Child message={message} />
        </div>
    );
}

export default function App() {
    const message = "Hello from App (passed via Parent)";
    return (
        <div>
            <h1>App</h1>
            <Parent message={message} />
        </div>
    );
}
