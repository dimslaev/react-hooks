import * as React from "react";
import { UseResizedExample } from "./examples/UseResizedExample";
import "./style.css";

const examples: {
  id: string;
  component: React.ReactNode;
}[] = [
  {
    id: "useResized",
    component: <UseResizedExample />,
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
            {examples.map(({ id, component }) => {
              return (
                <a
                  key={`nav-link-${id}`}
                  role="button"
                  onClick={() => setExample(component)}
                >
                  {id}
                </a>
              );
            })}
          </nav>
        </>
      )}
    </main>
  );
};

export default App;
