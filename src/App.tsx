import { useState } from 'react'
import { Privacy } from './components/Privacy'
import { GuidedDemo } from './components/GuidedDemo'
import { Welcome } from './components/Welcome'

type Stage = 'welcome' | 'guided' | 'privacy'

function App() {
  const [stage, setStage] = useState<Stage>('welcome')
  const [privacyReturnStage, setPrivacyReturnStage] = useState<Stage>('welcome')

  const openPrivacy = () => {
    setPrivacyReturnStage(stage)
    setStage('privacy')
  }

  const closePrivacy = () => setStage(privacyReturnStage)

  return <div className="app-shell">
    <header className="topbar">
      <button className="wordmark" onClick={() => setStage('welcome')} aria-label="Go to home">
        <span className="wordmark-mark">RR</span><span>Room to Respond</span>
      </button>
      <nav className="topnav" aria-label="Primary navigation">
        <button className={stage === 'guided' ? 'active' : ''} aria-current={stage === 'guided' ? 'page' : undefined} onClick={() => setStage('guided')}>Guided demo</button>
        <button className={stage === 'privacy' ? 'active' : ''} aria-current={stage === 'privacy' ? 'page' : undefined} onClick={openPrivacy}>Privacy</button>
      </nav>
      <div className="storage-status"><span className="status-dot" /> Review prototype</div>
    </header>

    <main>
      {stage === 'welcome' && <Welcome onPrivacy={openPrivacy} onGuidedDemo={() => setStage('guided')} />}
      {stage === 'guided' && <GuidedDemo onBack={() => setStage('welcome')} />}
      {stage === 'privacy' && <Privacy onBack={closePrivacy} />}
    </main>

    {stage === 'guided' && <footer className="practice-footer"><span>Seeded review prototype</span><button onClick={openPrivacy}>View privacy boundary</button></footer>}
  </div>
}

export default App
