import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Main from './layouts/Main'
import Orders from './components/Orders/Orders'
import Inventory from './components/Inventory/Inventory'
import About from './components/About/About'
import Shop from './components/Shop/Shop'
import { productsAndCartLoaders } from './layouts/productsAndCartLoaders'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import Shipping from './components/Shipping/Shipping'
import PrivateRoute from './routes/PrivateRoute'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main></Main>,
      children: [
        {
          path: '/',
          loader: () => fetch('products.json'),
          element: <Shop></Shop>,
        },
        {
          path: '/orders',
          loader: productsAndCartLoaders,
          element: <Orders></Orders>,
        },
        {
          path: '/shipping',
          element: <PrivateRoute><Shipping></Shipping></PrivateRoute>,
        },
        {
          path: '/inventory',
          element: <PrivateRoute><Inventory></Inventory></PrivateRoute>,
        },
        {
          path: 'about',
          element: <About></About>,
        },
        {
          path: '/login',
          element: <Login></Login>,
        },
        {
          path: '/signup',
          element: <Signup></Signup>,
        },
      ],
    },
  ])
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  )
}

export default App
