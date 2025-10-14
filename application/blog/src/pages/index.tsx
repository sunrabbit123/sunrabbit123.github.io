import { createRoot } from "react-dom/client";

function Page() {
    return <div>Hello, world!</div>;
}

createRoot(window.document.getElementById("root")!).render(
  <Page />,
);
