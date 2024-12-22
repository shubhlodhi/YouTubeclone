import { render } from 'preact'
import './index.css'
import { App } from './app.jsx'
import { createBrowserRouter , RouterProvider } from 'react-router-dom'
// import { Buffer } from 'buffer';
// window.Buffer = Buffer;  // Assign it to the global window object



render(<App />, document.getElementById('app'))
