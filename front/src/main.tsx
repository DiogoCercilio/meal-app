import ReactDOM from 'react-dom/client'

import './index.css'
import App from './components/App/App'
import { ThemeProvider } from "@material-tailwind/react";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <ThemeProvider>
      <App />
    </ThemeProvider>
)
