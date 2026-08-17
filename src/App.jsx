import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Cursor from './components/shared/Cursor.jsx'
import Home from './pages/Home.jsx'
import Labs from './pages/Labs.jsx'
import Manager from './pages/Manager.jsx'
import { DiscoveryCallProvider } from './context/DiscoveryCallContext.jsx'
import { ManagerAuthProvider } from './context/ManagerAuthContext.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Cursor />
      <ManagerAuthProvider>
        <DiscoveryCallProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/labs" element={<Labs />} />
            <Route path="/manager/*" element={<Manager />} />
          </Routes>
        </DiscoveryCallProvider>
      </ManagerAuthProvider>
    </BrowserRouter>
  )
}
