import * as React from "react";
import { useResized } from "../../src";
import "./UseResizedExample.css";

export const UseResizedExample = () => {
  const [enabled, setEnabled] = React.useState(true);

  useResized(enabled);

  return (
    <div style={{ height: "1000px", padding: "0 16px" }}>
      <div
        style={{
          position: "fixed",
          zIndex: 1,
          top: "50%",
          left: 16,
          right: 16,
          textAlign: "center",
          background: "black",
          color: "white",
        }}
      >
        <h1>Scroll on mobile</h1>
        <p>
          Scroll this page <em>down</em> and then <em>up</em> on mobile to see
          the address bar hiding away.
        </p>

        <p>
          Notice how `window.innerHeight` only changes if the hook is enabled.
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
  );
};
