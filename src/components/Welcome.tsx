type Props = { onBegin: () => void; onFloor: () => void; onPrivacy: () => void; onJourney: () => void; onPractitioner: () => void; hasHistory: boolean; onThreads: () => void; allComplete: boolean }

const workouts = [
  ['Pause', 'Create more space before responding', 'attention · emotion · choice'],
  ['Perspective', 'See the story you are telling yourself', 'memory · meaning · metacognition'],
  ['Courage', 'Say what you mean when the moment gets hard', 'values · communication · self-regulation'],
  ['Flexibility', 'Make room for another possible response', 'imagination · foresight · learning'],
]

export function Welcome({ onPrivacy, onPractitioner }: Props) {
  return <section className="landing-page">
    <div className="landing-hero page-grid">
      <div className="landing-copy">
        <p className="kicker">Room to Respond</p>
        <h1>Give your mind<br /><em>a proper workout.</em></h1>
        <p className="lede">A coach-led way to build the mental faculties you use in conversations, decisions, work, relationships, and unfamiliar situations.</p>
        <div className="welcome-actions"><button className="primary-button" onClick={onPractitioner}>Try a guided workout <span>→</span></button><span className="hero-support">Maya’s session is ready to go</span></div>
      </div>
      <div className="landing-preview" aria-label="Preview of today's mental workout">
        <div className="preview-topline"><span>Maya’s workout</span><span>08 min</span></div>
        <div className="preview-focus"><span className="preview-number">01</span><div><p className="preview-label">Focus: Pause before responding</p><h2>Stay for one more exchange</h2><p>When criticism feels exposing, notice the urge to leave and ask one clear question before you go.</p></div></div>
        <div className="preview-list"><div className="preview-row preview-row-done"><span>01</span><strong>Look at a moment from your life</strong><small>Ready</small></div><div className="preview-row"><span>02</span><strong>Check what the reflection picked up</strong><small>Next</small></div><div className="preview-row"><span>03</span><strong>Try another response</strong><small>Next</small></div></div>
      <div className="preview-footer"><span>Set by your coach</span><span className="preview-arrow">↗</span></div>
      </div>
    </div>

    <div className="landing-section landing-classroom">
      <div className="page-grid landing-section-head"><div className="landing-section-title"><p className="kicker">Different goals need different workouts</p><h2>Choose what to develop.</h2></div><div className="landing-section-copy"><p>A coach can create a workout around pausing, perspective, courage, or flexibility, depending on what the client needs to practise.</p></div></div>
      <div className="page-grid landing-workouts">{workouts.map(([name, title, faculties], index) => <article key={name} className={index === 0 ? 'selected' : ''}><span className="workout-index">0{index + 1}</span><span className="workout-name">{name}</span><h3>{title}</h3><p>{faculties}</p><span className="workout-arrow">↗</span></article>)}</div>
    </div>

    <div className="landing-section landing-rhythm">
      <div className="page-grid landing-section-head"><div className="landing-section-title"><p className="kicker">One workout, three moves</p><h2>Work through a moment. Try another response. Take the learning forward.</h2></div><div className="landing-section-copy"><p>Physical gyms bring exercises together into a practical routine. Room to Respond does the same for mental faculties.</p></div></div>
      <div className="page-grid landing-rhythm-track"><article><span>Start</span><h3>Look back at what happened.</h3><p>Name what you felt, thought, said, and did.</p></article><article><span>Try</span><h3>See what you could do differently.</h3><p>Change one part of the moment and try a different response.</p></article><article><span>Carry forward</span><h3>Choose what to remember.</h3><p>Keep one useful response for the next time this happens and share it with your coach.</p></article></div>
    </div>

    <div className="landing-section landing-coach page-grid"><div className="landing-section-title"><p className="kicker">Built with a coach</p><h2>Your coach chooses the focus.</h2></div><div className="landing-section-copy"><p>The coach notices a pattern that is getting in the way of development, sets the workout, reviews your reflection, and shapes what you practise next.</p><p className="landing-pull">You notice the pattern in your own life, decide what fits, and choose what to carry forward.</p></div></div>

    <div className="landing-section landing-why page-grid"><div className="landing-section-title"><p className="kicker">Why a gym for the mind?</p><h2>Modern life changes what we practise.</h2></div><div className="landing-section-copy"><p>Cars, elevators, and machines reduced some of the physical movement built into daily life. This contributed to physical inactivity. <a href="https://www.who.int/publications/i/item/9789240059153" target="_blank" rel="noreferrer">WHO Global status report</a>.</p><p>Digital life also changes the demands placed on attention, emotion regulation, memory, and decision-making. Room to Respond brings exercises for these faculties into one practical workout.</p></div></div>

    <div className="landing-genai page-grid"><div><p className="kicker">What GenAI adds</p><h2>A personal workout can adapt as you work through it.</h2></div><div><p>GenAI can work from the client’s own words, ask the next useful question, change one part of a scenario, and prepare a reflection for the coach.</p><p>The coach sets the goal. The client decides what fits.</p></div></div>
    <div className="landing-demo page-grid"><div><p className="kicker">See the whole loop</p><h2>Watch one workout from focus to next step.</h2><p>Follow Maya’s coach-led workout: look at a difficult moment, try another response, share the reflection, and see what comes next.</p></div><button className="primary-button" onClick={onPractitioner}>Start Maya’s workout <span>→</span></button></div>
    <button className="landing-privacy" onClick={onPrivacy}>Read the privacy and safety boundary →</button>
  </section>
}
