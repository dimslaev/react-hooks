import SmoothScroll, { Options } from "./smoothScroll";

/**
 * @method useSmoothScroll
 * Cross-browser smooth scrolling with callback
 */

export const useSmoothScroll = (options?: Options) => {
  return SmoothScroll.init(options || {});
};
