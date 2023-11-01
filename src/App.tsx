import { ChakraProvider, CSSReset, extendTheme } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import AdminPage from "./components/AdminPage";
import ProductCard from "./components/ProductCard";

const theme = extendTheme({});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <NavBar />
      <Routes>
        <Route path="/" element={<ProductCard />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
