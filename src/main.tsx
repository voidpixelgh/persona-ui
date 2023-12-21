import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
/* import ThemeProvider from './utils/ThemeContext'; */
import { ThemeProvider } from "@material-tailwind/react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { ResponseProvider } from './utils/ResponseContext';
import './index.css'

const customTheme = { }

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider value={customTheme}>
      <QueryClientProvider client={queryClient}>
        <ResponseProvider>
          <App />
        </ResponseProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
