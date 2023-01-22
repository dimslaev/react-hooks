import * as React from "react";
import { UseResizedExample } from "./examples/UseResizedExample";
import { UseSmoothScroll } from "./examples/UseSmoothScroll";

import "./style.css";

const examples: {
  id: string;
  component: React.ReactNode;
}[] = [
  {
    id: "useResized",
    component: <UseResizedExample />,
  },
  {
    id: "useSmoothScroll",
    component: <UseSmoothScroll />,
  },
];

export const App = () => {
  const [example, setExample] = React.useState<React.ReactNode | null>(null);

  return (
    <main>
      {example || (
        <>
          <h1>Pick an example:</h1>

          <nav>
            <ul>
              {examples.map(({ id, component }) => {
                return (
                  <li key={`nav-item-${id}`}>
                    <a role="button" onClick={() => setExample(component)}>
                      {id}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </>
      )}
    </main>
  );
};

export default App;
