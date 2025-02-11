import { BrowserRouter } from "react-router";
import AnimatedRoutes from "./router";
import useStore from "./store";
import { useEffect } from "react";

function App() {
  const reset = useStore((state) => state.reset);

  useEffect(() => {
    reset();
  }, [reset]);

  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;
