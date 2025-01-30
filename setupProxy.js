const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: "http://localhost:8080",
      changeOrigin: true,
      onProxyRes: function (proxyRes) {
        // Eliminar encabezados inseguros
        delete proxyRes.headers["x-powered-by"];
        
        // Añadir encabezados de seguridad
        proxyRes.headers["Content-Security-Policy"] = "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:;";
        proxyRes.headers["X-Frame-Options"] = "DENY"; // Protección contra clickjacking
        proxyRes.headers["X-Content-Type-Options"] = "nosniff"; // Evita el sniffing de contenido
        proxyRes.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"; // Protección de privacidad
        proxyRes.headers["Permissions-Policy"] = "geolocation=(), microphone=(), camera=()"; // Restringe APIs sensibles
      }
    })
  );
};
