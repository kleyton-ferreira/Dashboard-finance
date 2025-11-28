import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { BrowserRouter, Routes, Route } from 'react-router'

import HomePage from './pages/home'
import SignUp from './pages/signup'
import LoginPage from './pages/login'
import NotFoundPage from './pages/not-found'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { AuthContextProvider } from './context/auth'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
      <Toaster />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
)
