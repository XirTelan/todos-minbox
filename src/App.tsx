import { ThemeProvider } from "./providers/themeProvider";
import RootLayout from "./components/layout/RootLayout";
import Todos from "./widgets/Todos";
import { Provider } from "react-redux";
import { store } from "./store/reduxStore";

function App() {
  return (
    <>
      <ThemeProvider>
        <RootLayout>
          <Provider store={store}>
            <Todos />
          </Provider>
        </RootLayout>
      </ThemeProvider>
    </>
  );
}

export default App;
