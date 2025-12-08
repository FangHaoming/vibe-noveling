import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import ConfigPage from './pages/ConfigPage'
import AIChatPage from './pages/AIChatPage'
import ChaptersPage from './pages/ChaptersPage'
import DatabasePage from './pages/DatabasePage'
import TimelinePage from './pages/TimelinePage'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/config" element={<ConfigPage />} />
          <Route path="/ai" element={<AIChatPage />} />
          <Route path="/chapters" element={<ChaptersPage />} />
          <Route path="/database" element={<DatabasePage />} />
          <Route path="/timeline" element={<TimelinePage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App

