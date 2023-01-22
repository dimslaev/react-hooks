import * as React from "react";
import { useSmoothScroll } from "../../src";
import "./UseSmoothScroll.css";

export const UseSmoothScroll = () => {
  const smooth = useSmoothScroll();

  return (
    <div style={{ height: "2000px", padding: "0 16px" }}>
      <button
        onClick={() => {
          smooth.scrollTo(0, 200, () => {
            // eslint-disable-next-line
            console.log("end");
          });
        }}
      >
        Scroll down 200px
      </button>
    </div>
  );
};
