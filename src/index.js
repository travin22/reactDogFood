import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'
import { Main } from './Main/Main'
import { AppContextProvider } from './context/AppContextProvider'
import { SignUp } from './Pages/SignUpPage/SignUp'
import { SignInMemo } from './Pages/SingInPage/SignIn'
import { Products } from './Products/Products/Products'

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
function clearClient() {
  queryClient.invalidateQueries({
    queryKey: ['allProducts'],
  })
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient} clearClient={clearClient}>
      <AppContextProvider>
        <RouterProvider router={router} />
      </AppContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
