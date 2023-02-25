import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import App from './App'
import { SignUp } from './Pages/SignUpPage/SignUp'
import { SignInMemo } from './Pages/SingInPage/SignIn'
import { Products } from './Products/Products/Products'
import { Cart } from './Pages/Cart/Cart'
import { store } from './redux/store'
import { Main } from './components/Main/Main'
import { Profile } from './Pages/Profile/Profile'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: 'signup',
        element: <SignUp />,
      },
      {
        path: 'signin',
        element: <SignInMemo />,
      },
      {
        path: 'products',
        element: <Products />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
    ],
  },
], { basename: '/reactDogFood' })

// { basename: '/reactDogFood' }

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>,
)
