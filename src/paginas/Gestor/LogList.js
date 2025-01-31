import { useEffect, useState } from "react";

const LogList = ({ onSelect }) => {
    const [applicationLogs, setApplicationLogs] = useState([]);
    const [loginLogs, setLoginLogs] = useState([]);

    useEffect(() => {
        fetch("https://portal-ucb-backend.onrender.com/api/v1/logs/")
            .then(response => response.json())
            .then(data => {
                // Filtrar los logs en dos listas separadas
                const appLogs = data.filter(log => log.startsWith("application"));
                const logins = data.filter(log => log.startsWith("login"));

                setApplicationLogs(appLogs);
                setLoginLogs(logins);
            })
            .catch(error => console.error("Error obteniendo logs:", error));
    }, []);

    return (
        <div style={{ display: "flex", justifyContent: "space-between", gap: "20px" }}>
            {/* Columna de Application Logs */}
            <div style={{ flex: 1 }}>
                <h3>Application Logs</h3>
                <ul style={{ listStyle: "none", padding: 0 }}>
                    {applicationLogs.map((log, index) => (
                        <li key={index}>
                            <button
                                style={{
                                    display: "block",
                                    width: "100%",
                                    padding: "10px",
                                    margin: "5px 0",
                                    background: "#e3f2fd",
                                    border: "1px solid #2196f3",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                }}
                                onClick={() => onSelect(log)}
                            >
                                {log}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Columna de Login Logs */}
            <div style={{ flex: 1 }}>
                <h3>Login Logs</h3>
                <ul style={{ listStyle: "none", padding: 0 }}>
                    {loginLogs.map((log, index) => (
                        <li key={index}>
                            <button
                                style={{
                                    display: "block",
                                    width: "100%",
                                    padding: "10px",
                                    margin: "5px 0",
                                    background: "#FFF9C5",
                                    border: "1px solid #F8C41A",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                }}
                                onClick={() => onSelect(log)}
                            >
                                {log}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default LogList;
