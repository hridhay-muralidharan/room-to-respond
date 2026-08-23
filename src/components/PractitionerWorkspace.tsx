import { useEffect, useRef, useState } from 'react'

type Props = { onBack: () => void }
type DemoStep = 'intro' | 'context' | 'situation' | 'mapping' | 'transfer' | 'report' | 'response'

const steps: { id: DemoStep; label: string }[] = [
  { id: 'context', label: 'Coach sets focus' },
  { id: 'situation', label: 'Maya’s moment' },
  { id: 'mapping', label: 'Maya checks' },
  { id: 'transfer', label: 'Try another response' },
  { id: 'report', label: 'Review and send' },
  { id: 'response', label: 'Coach responds' },
]

const faculties = ['Attention', 'Emotion awareness', 'Self-regulation', 'Judgment', 'Communication', 'Flexibility']

const livedAccount = 'In the review meeting, my manager pointed out that the requirements document still had gaps. I felt exposed and immediately started thinking that I was failing again. I answered briefly, said I would fix it, and then wanted to leave the conversation. Later, I kept replaying the criticism and felt embarrassed that I had not explained what I was struggling with.'

export function PractitionerWorkspace({ onBack }: Props) {
  const [step, setStep] = useState<DemoStep>('intro')
  const stageRef = useRef<HTMLDivElement>(null)
  const currentIndex = steps.findIndex((item) => item.id === step)
  const next = () => setStep(step === 'intro' ? 'context' : steps[Math.min(currentIndex + 1, steps.length - 1)].id)

  useEffect(() => {
    if (step === 'intro') return
    stageRef.current?.scrollIntoView({ block: 'start' })
  }, [step])

  return <section className="guided-demo page-narrow">
    <div className="guided-demo-heading guided-four-step-heading">
      <div>
        <button className="back-button" onClick={onBack}>← Home</button>
        <p className="kicker">Maya’s session · {step === 'intro' ? 'Guided demo' : steps[currentIndex].label}</p>
        <h2>See how it works.<br /><em>Then follow Maya’s workout.</em></h2>
        <p className="guided-demo-lede">Follow Maya and her coach from the first step to the next workout.</p>
      </div>
      <div className="guided-demo-client"><span>DEMO CLIENT</span><strong>Maya R.</strong><p>Maya is practising how to stay in a conversation when criticism feels threatening.</p></div>
    </div>

    {step !== 'intro' && <div className="guided-progress guided-six-step-progress" aria-label={`Step ${currentIndex + 1} of ${steps.length}`}>
      {steps.map((item, index) => <button key={item.id} className={index === currentIndex ? 'active' : index < currentIndex ? 'complete' : ''} onClick={() => setStep(item.id)}><span>{String(index + 1).padStart(2, '0')}</span>{item.label}</button>)}
      <div className="guided-local-progress"><strong>Step {currentIndex + 1} of {steps.length}</strong><span>{steps[currentIndex].label}</span></div>
    </div>}

    <div ref={stageRef} className="guided-demo-stage guided-four-step-stage">
      {step === 'intro' && <IntroStep onNext={next} />}
      {step === 'context' && <ContextStep onNext={next} />}
      {step === 'situation' && <SituationStep onNext={next} />}
      {step === 'mapping' && <MappingStep onNext={next} />}
      {step === 'transfer' && <TransferStep onNext={next} />}
      {step === 'report' && <ReportStep onNext={next} />}
      {step === 'response' && <ResponseStep onRestart={() => setStep('intro')} />}
    </div>
  </section>
}

function ContinueButton({ children, onNext, disabled = false }: { children: string; onNext: () => void; disabled?: boolean }) {
  return <button className="primary-button" onClick={onNext} disabled={disabled}>{children} <span>→</span></button>
}

function IntroStep({ onNext }: { onNext: () => void }) {
  return <>
    <StepIntro label="Before you begin" title="Follow one workout from start to finish." copy="Maya’s coach wants her to practise pausing when criticism feels threatening. First, the coach sets the focus. Maya then looks at a moment from her life. The coach responds at the end." />
    <div className="demo-orientation">
      <div className="demo-orientation-roles"><span className="section-label">Who does what</span><div><strong>Coach</strong><p>Chooses what Maya will practise.</p></div><div><strong>Maya</strong><p>Looks at what happened and tries another response.</p></div><div><strong>Room to Respond</strong><p>Helps Maya reflect and share the work.</p></div></div>
      <div className="demo-orientation-sequence"><span className="section-label">What you’ll see</span><ol><li>The coach sets the focus</li><li>Maya looks at what happened</li><li>Maya checks the reflection</li><li>Maya tries another response</li><li>Maya sends it to her coach</li><li>The coach responds</li></ol></div>
    </div>
    <div className="demo-orientation-note"><strong>This is a guided demo.</strong><span>Nothing to write. Just follow along.</span></div>
    <div className="guided-action-row"><ContinueButton onNext={onNext}>Start the workout</ContinueButton></div>
  </>
}

function ContextStep({ onNext }: { onNext: () => void }) {
  return <>
    <StepIntro label="01 · Coach sets the focus" title="Start with a clear focus." copy="Maya’s coach has chosen one pattern for her to notice and develop." />
    <div className="context-workspace">
      <div className="context-story">
        <span className="section-label">What the coach has noticed</span>
        <h4>Across the last four sessions, Maya has found criticism difficult to respond to.</h4>
        <p>When she feels exposed, she tends to answer briefly, leave the conversation, and replay it afterward. Her coach wants to help her find a little more space before that first reaction takes over.</p>
        <div className="context-callout"><span>Why this matters</span><strong>A pause creates room to notice what is happening, check the first story, and choose what to say next.</strong></div>
      </div>
      <aside className="context-focus">
        <span className="section-label">Today’s focus</span>
        <h4>Pause before responding</h4>
        <p>This session is designed to develop:</p>
        <div className="faculty-pills">{faculties.map((faculty) => <span key={faculty}>{faculty}</span>)}</div>
        <div className="context-session"><small>The session</small><strong>One moment from life</strong><span>Notice → try → choose what to use next</span></div>
      </aside>
    </div>
    <div className="guided-action-row"><ContinueButton onNext={onNext}>See Maya’s starting point</ContinueButton><span>Next: Maya looks at a moment from her life</span></div>
  </>
}

function SituationStep({ onNext }: { onNext: () => void }) {
  const [showDetails, setShowDetails] = useState(true)
  return <>
    <StepIntro label="02 · Maya’s moment" title="Think of a moment from your life." copy="Maya looks at a moment when criticism made her want to leave the conversation. She starts with her own words before Room to Respond reflects anything back." />
    <div className="situation-workspace">
      <div className="situation-header"><span className="section-label">Maya’s account</span><span className="guided-status">From Maya’s life</span></div>
      <h4>Feedback in a review meeting</h4>
      <blockquote>“{livedAccount}”</blockquote>
      <button className="details-toggle" onClick={() => setShowDetails(!showDetails)}>{showDetails ? 'Hide the details' : 'See the details'} <span>{showDetails ? '↑' : '↓'}</span></button>
      {showDetails && <div className="situation-details"><div><small>Felt and noticed</small><p>Exposed, embarrassed, tightness in my chest.</p></div><div><small>Thought or assumed</small><p>“I am failing again. They can see I am not good enough.”</p></div><div><small>Said and did</small><p>I answered briefly, said I would fix it, and wanted to leave.</p></div><div><small>Wanted or protected</small><p>I wanted to understand what was missing without feeling judged.</p></div></div>}
    </div>
    <div className="guided-action-row"><ContinueButton onNext={onNext}>See what this moment may show</ContinueButton><span>Next: Maya checks the reflection</span></div>
  </>
}

function MappingStep({ onNext }: { onNext: () => void }) {
  const [decisions, setDecisions] = useState<Record<string, 'keep' | 'change' | undefined>>({})
  const decide = (key: string, value: 'keep' | 'change') => setDecisions((current) => ({ ...current, [key]: value }))
  const confirmed = Object.values(decisions).filter(Boolean).length
  return <>
    <StepIntro label="03 · Maya checks the reflection" title="Does this fit your experience?" copy="The product reflects possible patterns from Maya’s words. Maya keeps what fits and adds context where it does not." />
    <div className="mapping-workspace">
      <div className="mapping-account"><span className="section-label">From Maya’s account</span><blockquote>“I felt exposed and immediately started thinking that I was failing again. I answered briefly and wanted to leave.”</blockquote><span className="guided-authorship">Client-authored</span></div>
      <div className="mapping-observations"><span className="section-label">Possible patterns</span><MappingCard title="The threat response took over quickly" copy="Feeling exposed may have made leaving feel safer than staying with the conversation." faculty="Emotion awareness · self-regulation" decision={decisions.reaction} onDecide={(value) => decide('reaction', value)} /><MappingCard title="There was little space between feeling and action" copy="The thought “I am failing again” appeared before Maya could ask what was missing or decide how she wanted to respond." faculty="Attention · judgment · flexibility" decision={decisions.story} onDecide={(value) => decide('story', value)} /><div className="mapping-correction"><span className="section-label">Maya’s own reflection</span><p>“I felt threatened, and the urge to leave took over quickly. I can create some space between that feeling and what I do next. In that space, I may be able to ask a question or choose what to say.”</p></div></div>
    </div>
    <div className="mapping-send"><div><strong>{confirmed ? `${confirmed} pattern${confirmed === 1 ? '' : 's'} reviewed` : 'Review the patterns before continuing'}</strong><span>{confirmed ? 'Maya will use these in the next exercise.' : 'Keep what fits. Add context where it does not.'}</span></div></div>
    <div className="guided-action-row"><ContinueButton onNext={onNext} disabled={confirmed === 0}>Try another response</ContinueButton><span>{confirmed ? 'Next: Maya tries another response' : 'Review at least one pattern to continue'}</span></div>
  </>
}

function MappingCard({ title, copy, faculty, decision, onDecide }: { title: string; copy: string; faculty: string; decision?: 'keep' | 'change'; onDecide: (value: 'keep' | 'change') => void }) {
  return <article className={decision ? 'mapping-card decided' : 'mapping-card'}><div><small>{faculty}</small><h4>{title}</h4><p>{copy}</p></div><div className="mapping-actions"><button className={decision === 'keep' ? 'mapping-choice active' : 'mapping-choice'} onClick={() => onDecide('keep')}>{decision === 'keep' ? 'Kept ✓' : 'This fits'}</button><button className={decision === 'change' ? 'mapping-choice change active' : 'mapping-choice change'} onClick={() => onDecide('change')}>{decision === 'change' ? 'Needs context ✓' : 'Needs context'}</button></div></article>
}

function TransferStep({ onNext }: { onNext: () => void }) {
  const [started, setStarted] = useState(false)
  return <>
    <StepIntro label="04 · Try another response" title="Try the same moment with one thing changed." copy="The moment stays recognisable, but one condition changes. Maya responds first, before the product reflects it back." />
    <div className="transfer-workspace">
      <div className="transfer-prompt"><span className="section-label">A changed version of the moment</span><h4>The same review meeting, with more time and support afterward.</h4><p>Your manager points out the same gaps. This time, you have the evening free and someone you trust is available afterward. What do you say or do before leaving?</p><button className="warmup-reveal" onClick={() => setStarted(true)}>{started ? 'Maya has responded' : 'See Maya’s response'} <span>{started ? '✓' : '→'}</span></button></div>
      <div className={started ? 'transfer-response revealed' : 'transfer-response'}><span className="section-label">Maya’s response</span>{started ? <><blockquote>“I would still feel embarrassed, but I might ask which part I should fix first and say I’ll send an updated version tomorrow. Knowing I can talk it through later makes it easier to stay.”</blockquote><span className="guided-authorship">Client response</span></> : <p className="transfer-awaiting">Her response will appear here after she tries the changed moment.</p>}</div>
    </div>
    <div className="guided-action-row"><ContinueButton onNext={onNext} disabled={!started}>Compare the two moments</ContinueButton><span>{started ? 'Response captured' : 'Try the changed situation first'}</span></div>
  </>
}

function ReportStep({ onNext }: { onNext: () => void }) {
  const [shared, setShared] = useState(false)
  return <>
    <StepIntro label="05 · Review and send" title="See what changed, then send it to your coach." copy="Maya compares her first response with the alternative, adds what she wants her coach to know, and sends the complete reflection." />
    <div className="report-workspace"><div className="report-column"><span className="section-label">First response</span><blockquote>“I felt exposed, thought I was failing again, answered briefly, and wanted to leave.”</blockquote><span className="guided-authorship">Maya’s account</span></div><div className="report-column"><span className="section-label">Another response</span><blockquote>“Which part should I fix first? I’ll send an updated version tomorrow.”</blockquote><span className="guided-authorship">Maya’s response</span></div></div>
    <div className="report-insight"><div><span className="section-label">Maya’s comparison</span><h4>The embarrassment stayed. She could still stay for one more exchange.</h4><p>In the changed moment, having more time afterward made it easier to ask one clear question before leaving.</p></div><div><span className="section-label">What Maya wants to remember</span><p>“I can create some space between feeling threatened and what I do next.”</p></div></div>
    <div className="mapping-send report-share"><div><strong>{shared ? 'Complete reflection sent to the coach' : 'This is what the coach will receive'}</strong><span>{shared ? 'Maya’s account, confirmed reflection, alternative response, and comparison.' : 'The reflection and alternative response stay together.'}</span></div><button className={shared ? 'share-report shared' : 'share-report'} onClick={() => setShared(true)}>{shared ? 'Sent ✓' : 'Send the complete reflection →'}</button></div>
    <div className="guided-action-row"><ContinueButton onNext={onNext} disabled={!shared}>See the coach’s response</ContinueButton><span>{shared ? 'Next: coach feedback' : 'Send the reflection to continue'}</span></div>
  </>
}

function ResponseStep({ onRestart }: { onRestart: () => void }) {
  return <>
    <StepIntro label="06 · Coach responds" title="Choose what to practise next." copy="The coach reviews Maya’s account and her other response, then sets the next focus." />
    <div className="response-workspace">
      <div className="response-confirmed"><span className="section-label">What Maya noticed</span><h4>She can stay for one more exchange.</h4><p>In the changed version of the meeting, having more time afterward made it easier to stay with the conversation instead of leaving straight away.</p><div className="response-evidence"><small>Another response she could try</small><strong>“Which part should I fix first? I’ll send an updated version tomorrow.”</strong></div><span className="guided-authorship">Shared by Maya</span></div>
      <div className="response-practitioner"><span className="section-label">Coach’s response</span><blockquote>“Next time you notice the urge to leave, stay for one more exchange. Ask one clear question before you go. You do not have to solve everything in that moment.”</blockquote><span className="guided-authorship">Written by the coach</span></div>
    </div>
    <div className="next-session-card"><div><span className="section-label">Next session</span><h4>Stay for one more exchange</h4><p>Practise noticing the urge to leave, asking one clear question, and agreeing on what happens next.</p></div><div className="next-session-details"><small>Focus</small><strong>Pause, then ask one clear question</strong><small>Try it when</small><strong>Someone points out a problem</strong><small>Look for</small><strong>One question before leaving</strong></div></div>
    <div className="guided-complete"><strong>The loop is complete.</strong><p>Focus → moment → another response → next workout.</p><button className="secondary-button" onClick={onRestart}>Run the demo again</button></div>
  </>
}

function StepIntro({ label, title, copy }: { label: string; title: string; copy: string }) {
  return <div className="guided-step-intro"><p className="kicker">{label}</p><h3>{title}</h3><p>{copy}</p></div>
}
