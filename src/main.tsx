import React from 'react'
import ReactDOM from 'react-dom/client'
import { router } from './App.tsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import CartProvider from './components/contexts/CartContext.tsx'
import { Toaster } from 'react-hot-toast' // Importando o Toaster


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CartProvider>  {/* Adicionando o CartProvider em volta das nossas rotas, ou seja, todas as rotas terão acesso as informações do CartProvider*/}
    <Toaster
      position='top-center'
      reverseOrder={false}
    />
      <RouterProvider router={router} />
    </CartProvider> 
  </React.StrictMode>,
)
