import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import Root from "./Root";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Login from "./components/auth/Login";
import PackageList from "./components/Package/PackageList";
import ErrorPage from "./components/Error/Error";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "/",
        element: <Login/>,
      },
      //     Package Routes
      {
        path: "/package",
        element: <PackageList/>,
      },
    ],
  },
]);

function App() {
  return <div className={'container mh-100'}>
    <RouterProvider router={router}/>
  </div>
}

export default App;
