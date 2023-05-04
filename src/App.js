import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import Root from "./Root";
import ErrorPage from "./components/Error/Error";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Login from "./components/auth/Login";
import FlightList from "./components/Flight/FlightList";
import HotelList from "./components/Hotel/HotelList";
import PackageList from "./components/Package/PackageList";
import Cart from "./components/Cart/Cart";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "/",
        element: <FlightList/>,
      },
      //   Flight Routes
      {
        path: "/flight",
        element: <FlightList/>,
      },
      //     Hotel Routes
      {
        path: "/hotel",
        element: <HotelList/>,
      },
      //     Package Routes
      {
        path: "/package",
        element: <PackageList/>,
      },
      //     Cart Routes
      {
        path: "/cart",
        element: <Cart/>,
      },
      //     Customer Routes
    ],
  },
]);

function App() {
  return <div className={'container mh-100'}>
    <RouterProvider router={router}/>
  </div>
}

export default App;
