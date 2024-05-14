import { createBrowserRouter } from "react-router-dom"; // Importando o BrowserRouter
import { Cart } from "./pages/cart"; // Importando a página Cart
import { Home } from "./pages/home"; // Importando a página Home
import { Layout } from "./components/layout"; // Importando o Layout
import { Product} from "./pages/products"
const router = createBrowserRouter([ // Criando o BrowserRouter
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/products/:id", // Rota dinâmica
        element: <Product />
      },
      {
      path: "*",
      element: <h1> 404 - Página não encontrada </h1>
      }
    ]
  }
]);
export { router };