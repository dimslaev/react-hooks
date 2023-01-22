# React Hooks

Library of react hooks I use frequently.

## Hooks

### useResized

Ensures window.innerHeight is updated as expected when the address bar on mobile devices collapses during scrolling.

Adding this hook in a top level component will ensure that window.innerHeight has correct value throughout
the application without importing the hook anywhere else.

### useSmoothScroll

Cross-browser smooth scrolling with callback.

Options:

| OPTION            | TYPE    | DEFAULT                  | DESCRIPTION                                                  |
| ----------------- | ------- | ------------------------ | ------------------------------------------------------------ |
| speed             | number  | 1                        | How many pixels to scroll per tick.                          |
| easing            | string  | "easeOut"                | Easing type - `linear` ,`easeOut`, `easeIn`, `easeInOut`.    |
| target            | object  | document.documentElement | Can also be any DOM element with `overflow: auto`.           |
| interruptOnScroll | boolean | true                     | Subsequent scrolls should interrupt ongoing scroll animation |
