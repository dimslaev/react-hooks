import * as React from "react";
import { debounce } from "@github/mini-throttle";

const RESIZE_THROTTLE_MS = 400;

type Resized = Pick<Window, "innerWidth" | "innerHeight">;

export const useResized = (
  enabled: boolean,
  throttleDelay?: number,
): Resized => {
  const [resized, setResized] = React.useState<Resized>({
    innerWidth: window ? window.innerWidth : 0,
    innerHeight: window ? window.innerHeight : 0,
  });

  React.useEffect(() => {
    if (enabled === false) return;

    const onResize = debounce(() => {
      setResized({
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
      });
    }, throttleDelay || RESIZE_THROTTLE_MS);

    window.addEventListener("resize", onResize);
    dispatchEvent(new Event("resize"));
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [enabled]);

  return resized;
};
