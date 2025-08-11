import React, { useEffect, useRef } from "react";
import { css, styled, globalCss } from "@pandacss/dev";

// Global styles equivalentes a tu CSS base
const globalStyles = globalCss({
  "*": {
    margin: 0,
    padding: 0,
    boxSizing: "border-box",
    fontFamily:
      "sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue'",
  },
  "a": {
    WebkitTapHighlightColor: "transparent",
  },
  "html": {
    scrollBehavior: "smooth",
    scrollbarWidth: "thin",
    scrollbarColor: "white transparent",
  },
  "body": {
    height: "100vh",
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    placeContent: "center",
    backgroundColor: "#000",
    overflow: "hidden",
  },
});

// Estilos con PandaCSS para tus clases

const SphereContainer = styled("div", {
  base: {
    position: "relative",
    width: "200px",
    height: "200px",
    perspective: "800px",
    margin: "100px auto",
    _hover: {
      ".layer": {
        borderColor: "springgreen",
      },
    },
    "@media (max-width: 1111px)": {
      zoom: 0.8,
    },
  },
});

const Sphere = styled("div", {
  base: {
    position: "absolute",
    width: "100%",
    height: "100%",
    transformStyle: "preserve-3d",
    animation: "rotateSphere 6s linear infinite",
  },
});

const Layer = styled("div", {
  base: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    border: "5px solid rgba(255, 69, 0, 0.4)",
  },
});

// Keyframes no soportado directamente, lo inyectamos manualmente en <style>
const styleSheet = `
@keyframes rotateSphere {
  from {
    transform: rotateY(0deg) rotateX(0deg);
  }
  to {
    transform: rotateY(360deg) rotateX(360deg);
  }
}
`;

export default function App() {
  const sphereRef = useRef(null);
  const numLayers = 20;

  useEffect(() => {
    globalStyles();
    if (!sphereRef.current) return;
    const sphere = sphereRef.current;

    while (sphere.firstChild) sphere.removeChild(sphere.firstChild);

    for (let i = 0; i < numLayers; i++) {
      const layer = document.createElement("div");
      const stem = document.createElement("div");
      layer.className = "layer";
      stem.className = "layer stem";
      layer.style.transform = `rotateY(${(i * 360) / numLayers}deg) translateZ(100px)`;
      stem.style.transform = `rotateX(${(i * 360) / numLayers}deg) translateZ(100px)`;
      sphere.appendChild(layer);
      sphere.appendChild(stem);
    }
  }, []);

  return (
    <>
      <style>{styleSheet}</style>
      <SphereContainer>
        <Sphere ref={sphereRef} />
      </SphereContainer>
    </>
  );
}

// Render dinámico con StrictMode y root creado al vuelo
import ReactDOM from "react-dom/client";
import React from "react";

const rootEl = document.createElement("div");
rootEl.id = "root";
document.body.appendChild(rootEl);

ReactDOM.createRoot(rootEl).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
