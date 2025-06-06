import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ThemeProvider } from './components/Theme.tsx'

createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
)