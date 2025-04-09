import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { ModeToggle } from "./components/themeToggle";
import { ThemeProvider } from "./providers/themeProvider";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <ThemeProvider>
        <header>
          <ModeToggle />
        </header>
        <main></main>
      </ThemeProvider>
    </>
  );
}

export default App;
