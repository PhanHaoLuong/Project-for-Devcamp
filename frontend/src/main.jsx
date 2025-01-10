import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./styles/styles.css"
import "./assets/fonts/themify-icons/themify-icons.css";
import App from './App.jsx'

import{ Query, QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
)
