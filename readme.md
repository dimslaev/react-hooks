# React Hooks

Library of react hooks I use frequently.

## Hooks

### useResized

Ensures window.innerHeight is updated as expected when the address bar on mobile devices collapses during scrolling.

Adding this hook in a top level component will ensure that window.innerHeight has correct value throughout
the application without importing the hook anywhere else.
