import * as React from "react";
import { debounce } from "@github/mini-throttle";

const DEBOUNCE_DELAY = 400;

/**
 * @method useResized
 *
 * Ensures window.innerHeight is updated as expected
 * when the address bar on mobile devices collapses
 * during scrolling.
 *
 * Adding this in a top level component will ensure that
 * window.innerHeight has correct value throughout the
 * application without importing the hook anywhere else.
 */

export const useResized = (enabled?: boolean, delay?: number): number => {
  const [height, setHeight] = React.useState(window.innerHeight);

  React.useEffect(() => {
    if (enabled === false) {
      return;
    }

    const onResize = debounce(() => {
      setHeight(window.innerHeight);
    }, delay || DEBOUNCE_DELAY);

    window.addEventListener("resize", onResize);
    dispatchEvent(new Event("resize"));
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [enabled]);

  return height;
};
