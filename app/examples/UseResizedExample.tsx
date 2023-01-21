import * as React from "react";
import { useResized } from "../../src";
import "./UseResizedExample.css";

export const UseResizedExample = () => {
  const [enabled, setEnabled] = React.useState(true);

  useResized(enabled);

  return (
    <div style={{ height: "2000px", padding: "0 16px" }}>
      <div
        style={{
          position: "fixed",
          zIndex: 1,
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          padding: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <div>
          <h1>Scroll on mobile</h1>
          <p>Scroll down and up to see the address bar toggling display.</p>

          <p>
            Observe how `window.innerHeight` only changes if the hook is
            enabled.
          </p>

          <p style={{ margin: "2rem 0" }}>
            <button onClick={() => setEnabled(!enabled)}>
              {enabled ? "Disable" : "Enable"} Listener
            </button>
          </p>

          <p>
            <pre style={{ color: enabled ? "lightgreen" : "lightgrey" }}>
              status: {enabled ? "listening" : "not listening"}{" "}
            </pre>
            <pre>window.innerHeight: {window.innerHeight}</pre>
          </p>
        </div>
      </div>
    </div>
  );
};
