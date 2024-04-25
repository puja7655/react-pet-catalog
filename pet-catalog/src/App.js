import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootOutlet from './components/pages/Root'
import Admin from './components/pages/Admin'
import PetsContainer from './components/pages/PetsContainer'
import PetDetail from './components/PetDetail'
import PetRootOutlet from './components/pages/PetRoot'

function App() {
  const router = createBrowserRouter([
    {
      path: '/', element: <RootOutlet />, children: [
        { index: true, element: <Admin /> },
        {
          path: 'pets', element: <PetRootOutlet />,
          children: [
            { index: true, element: <PetsContainer /> },
            { path: ':id', element: <PetDetail /> }
          ]
        }
      ]
    }
  ])
  return <RouterProvider router={router}></RouterProvider>
}

export default App
