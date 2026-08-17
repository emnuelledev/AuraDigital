import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Cursor from './components/shared/Cursor.jsx'
import Home from './pages/Home.jsx'
import Labs from './pages/Labs.jsx'
import { DiscoveryCallProvider } from './context/DiscoveryCallContext.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Cursor />
      <DiscoveryCallProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/labs" element={<Labs />} />
        </Routes>
      </DiscoveryCallProvider>
    </BrowserRouter>
  )
}
