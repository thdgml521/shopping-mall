import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './app'
import './scss/index.scss'
import './scss/products.scss'
import './scss/cart.scss'
import { worker } from './mocks/browser'

if(import.meta.env.DEV) {
  worker.start()
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
)
