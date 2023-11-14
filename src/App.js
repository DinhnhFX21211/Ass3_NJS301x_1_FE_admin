import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import "./App.css";
import MainLayout from "./layout/MainLayout/MainLayout";
import Dashboard from "./pages/Dashboard/Dashboard";
import ProductsPage from "./pages/Products/ProductsPage";
import LoginPage from "./pages/Login/LoginPage";
import { SnackbarProvider } from "notistack";
import { loader as infoBoardLoader } from "./pages/Dashboard/Dashboard";
import { loader as productDetailsLoader } from "./pages/UpdateProduct/UpdateProductPage";
import { loader as orderDetailsLoader } from "./pages/UpdateOrder/UpdateOrderPage";
import CreateProductPage from "./pages/CreateProduct/CreateProductPage";
import ChatPage from "./pages/ChatPage/ChatPage";
import UpdateProductPage from "./pages/UpdateProduct/UpdateProductPage";
import UpdateOrderPage from "./pages/UpdateOrder/UpdateOrderPage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useSelector((state) => state.auth);
  if (currentUser.role.toString() === "ADMIN") {
    return children;
  }
  if (currentUser.role.toString() === "Counselor") {
    return <ChatPage />;
  }
};
const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Navigate to="/login" replace /> },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
        loader: infoBoardLoader,
      },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <ProductsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "products/create",
        element: (
          <ProtectedRoute>
            <CreateProductPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "products/update/:productId",
        element: (
          <ProtectedRoute>
            <UpdateProductPage />
          </ProtectedRoute>
        ),
        loader: productDetailsLoader,
      },
      {
        path: "chat",
        element: <ChatPage />,
      },
      {
        path: "order/:orderId",
        element: (
          <ProtectedRoute>
            <UpdateOrderPage />
          </ProtectedRoute>
        ),
        loader: orderDetailsLoader,
      },
    ],
  },
  { path: "/login", element: <LoginPage /> },
]);

function App() {
  return (
    <SnackbarProvider>
      <RouterProvider router={routes} />
    </SnackbarProvider>
  );
}

export default App;
