type Axis = "y" | "x";
type Direction = "asc" | "desc";
type Easing = "linear" | "easeOut" | "easeIn" | "easeInOut";
type Easings = {
  [key in Easing]: (t: number) => number;
};

export type Options = {
  speed?: number;
  easing?: Easing;
  target?: HTMLElement;
  interruptOnScroll?: boolean;
};

export type ISmoothScroll = {
  speed: number;
  target: HTMLElement;
  interruptOnScroll: boolean;
  init: (options: Options) => ISmoothScroll;
  scrollTo: (x: number, y: number, callback: () => void) => void;
  isScrolling: boolean;
  axis: Axis;
  to: number;
  from: number;
  startTime: number;
  direction: Direction;
  distance: number;
  duration: number;
  wasInterrupted: boolean;
  easingFn: Easings[Easing];
  callback?: () => void;
  getFromCoordinate: () => number;
  getToCoordinate: () => number;
  getDistance: () => number;
  getProgressCoordinate: (progress: number) => number;
  addListeners: () => void;
  removeListeners: () => void;
  onScrollStart: () => void;
  onScrollEnd: () => void;
  onScrollInterrupt: () => void;
  scroll: (coordinate: number) => void;
  tick: () => void;
};

const EASINGS: Easings = {
  linear: (t: number) => t,
  easeOut: (t: number) => t * t,
  easeIn: (t: number) => t * (2 - t),
  easeInOut: (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
};

const SmoothScroll: ISmoothScroll = {
  axis: "y",
  direction: "asc",
  to: 0,
  from: 0,
  startTime: 0,
  distance: 0,
  duration: 0,
  speed: 1,
  target: document.documentElement,
  easingFn: EASINGS["easeOut"],
  interruptOnScroll: true,
  isScrolling: false,
  wasInterrupted: false,

  init: function (options) {
    this.speed = options.speed || this.speed;
    this.easingFn = options.easing ? EASINGS[options.easing] : this.easingFn;
    this.target = options.target || this.target;
    this.interruptOnScroll =
      options.interruptOnScroll || this.interruptOnScroll;
    return this;
  },

  scrollTo: function (x, y, callback) {
    if (this.isScrolling) return;

    this.axis = x ? "x" : "y";
    this.to = x || y;
    this.callback = callback;

    this.startTime = performance.now();
    this.from = this.getFromCoordinate();
    this.to = this.getToCoordinate();
    this.direction = this.to > this.from ? "asc" : "desc";
    this.distance = this.getDistance();
    this.duration = this.speed * this.distance;

    this.wasInterrupted = false;

    if (this.distance === 0) {
      return;
    }

    this.onScrollStart();
  },

  getFromCoordinate: function () {
    if (this.axis === "y") {
      return this.target.scrollTop;
    } else {
      return this.target.scrollLeft;
    }
  },

  getToCoordinate: function () {
    if (this.axis === "y") {
      return Math.max(
        Math.min(this.to, this.target.scrollHeight - this.target.clientHeight),
        0,
      );
    } else {
      return Math.max(
        Math.min(this.to, this.target.scrollWidth - this.target.clientWidth),
        0,
      );
    }
  },

  getDistance: function () {
    if (this.direction === "asc") {
      return this.to - this.from;
    } else {
      return this.from - this.to;
    }
  },

  getProgressCoordinate(displacement) {
    if (this.direction === "asc") {
      return this.from + displacement;
    } else {
      return this.from - displacement;
    }
  },

  addListeners: function () {
    this.target.addEventListener(
      "mousewheel",
      this.onScrollInterrupt.bind(this),
    );
    this.target.addEventListener(
      "touchmove",
      this.onScrollInterrupt.bind(this),
    );
  },

  removeListeners: function () {
    this.target.removeEventListener(
      "mousewheel",
      this.onScrollInterrupt.bind(this),
    );
    this.target.removeEventListener(
      "touchmove",
      this.onScrollInterrupt.bind(this),
    );
  },

  onScrollStart: function () {
    this.isScrolling = true;
    requestAnimationFrame(this.tick.bind(this));
    this.addListeners();
  },

  onScrollEnd: function () {
    this.isScrolling = false;
    typeof this.callback === "function" && this.callback();
    this.removeListeners();
  },

  onScrollInterrupt: function () {
    this.isScrolling = false;
    this.wasInterrupted = true;
    this.removeListeners();
  },

  scroll(coordinate) {
    if (this.axis === "y") {
      this.target.scrollTop = coordinate;
    } else {
      this.target.scrollLeft = coordinate;
    }
  },

  tick: function () {
    if (this.interruptOnScroll && this.wasInterrupted) return;

    const elapsed = performance.now() - this.startTime;
    const progress = Math.min(elapsed / this.duration, 1);
    const displacement = this.easingFn(progress) * this.distance;
    const progressCoordinate = this.getProgressCoordinate(displacement);

    if (progress < 1) {
      this.scroll(progressCoordinate);
      requestAnimationFrame(this.tick.bind(this));
    } else {
      this.scroll(this.to);
      requestAnimationFrame(this.onScrollEnd.bind(this));
    }
  },
};

export default SmoothScroll;
