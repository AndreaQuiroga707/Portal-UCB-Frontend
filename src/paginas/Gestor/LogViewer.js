import { useState, useEffect } from "react";

const LogViewer = ({ filename }) => {
    const [logContent, setLogContent] = useState("");

    useEffect(() => {
        if (!filename) return;

        fetch(`https://portal-ucb-backend.onrender.com/api/v1/logs/${filename}`)
            .then(response => response.text())
            .then(data => setLogContent(data))
            .catch(error => console.error("Error obteniendo log:", error));
    }, [filename]);

    return (
        <div>
            <h2>Contenido de {filename}</h2>
            <pre style={{ whiteSpace: "pre-wrap", background: "#f4f4f4", padding: "10px", borderRadius: "5px" }}>
                {logContent}
            </pre>
        </div>
    );
};

export default LogViewer;
