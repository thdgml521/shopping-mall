import React from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import App from './app'
import './scss/index.scss'
import { worker } from './mocks/browser'
import { RecoilRoot } from 'recoil'
const container = document.getElementById('root')
const root = createRoot(container)

if (import.meta.env.DEV) {
  worker.start()
}

root.render(
    <React.StrictMode>
      <RecoilRoot>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
      </RecoilRoot>
    </React.StrictMode>
)
