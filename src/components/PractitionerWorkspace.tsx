import { useState } from 'react'

type Props = { onBack: () => void }
type DemoStep = 'context' | 'situation' | 'mapping' | 'transfer' | 'report' | 'response'

const steps: { id: DemoStep; label: string }[] = [
  { id: 'context', label: 'Set the context' },
  { id: 'situation', label: 'Maya’s situation' },
  { id: 'mapping', label: 'Maya confirms' },
  { id: 'transfer', label: 'Try another response' },
  { id: 'report', label: 'Compare and send' },
  { id: 'response', label: 'Next session' },
]

const faculties = ['Attention', 'Emotion awareness', 'Self-regulation', 'Judgment', 'Communication', 'Flexibility']

const livedAccount = 'In the review meeting, my manager pointed out that the requirements document still had gaps. I felt exposed and immediately started thinking that I was failing again. I answered briefly, said I would fix it, and then wanted to leave the conversation. Later, I kept replaying the criticism and felt embarrassed that I had not explained what I was struggling with.'

export function PractitionerWorkspace({ onBack }: Props) {
  const [step, setStep] = useState<DemoStep>('context')
  const currentIndex = steps.findIndex((item) => item.id === step)
  const next = () => setStep(steps[Math.min(currentIndex + 1, steps.length - 1)].id)

  return <section className="guided-demo page-narrow">
    <div className="guided-demo-heading guided-four-step-heading">
      <div>
        <button className="back-button" onClick={onBack}>← Home</button>
        <p className="kicker">Maya’s session · {steps[currentIndex].label}</p>
        <h2>Understand the moment.<br /><em>Make the next one easier.</em></h2>
        <p className="guided-demo-lede">A practitioner shares the reason for the work. Maya brings a real moment. Together, they decide what to practise next.</p>
      </div>
      <div className="guided-demo-client"><span>DEMO CLIENT</span><strong>Maya R.</strong><p>Four sessions into work on responding to criticism.</p></div>
    </div>

    <div className="guided-progress guided-six-step-progress" aria-label={`Step ${currentIndex + 1} of ${steps.length}`}>
      {steps.map((item, index) => <button key={item.id} className={index === currentIndex ? 'active' : index < currentIndex ? 'complete' : ''} onClick={() => setStep(item.id)}><span>{String(index + 1).padStart(2, '0')}</span>{item.label}</button>)}
      <div className="guided-local-progress"><strong>Step {currentIndex + 1} of {steps.length}</strong><span>{steps[currentIndex].label}</span></div>
    </div>

    <div className="guided-demo-stage guided-four-step-stage">
      {step === 'context' && <ContextStep onNext={next} />}
      {step === 'situation' && <SituationStep onNext={next} />}
      {step === 'mapping' && <MappingStep onNext={next} />}
      {step === 'transfer' && <TransferStep onNext={next} />}
      {step === 'report' && <ReportStep onNext={next} />}
      {step === 'response' && <ResponseStep onRestart={() => setStep('context')} />}
    </div>
  </section>
}

function ContinueButton({ children, onNext, disabled = false }: { children: string; onNext: () => void; disabled?: boolean }) {
  return <button className="primary-button" onClick={onNext} disabled={disabled}>{children} <span>→</span></button>
}

function ContextStep({ onNext }: { onNext: () => void }) {
  return <>
    <StepIntro label="01 · Practitioner context" title="Give the work a reason." copy="Maya should understand why this is the focus before she is asked to examine a difficult moment." />
    <div className="context-workspace">
      <div className="context-story">
        <span className="section-label">What the practitioner has noticed</span>
        <h4>Across the last four sessions, Maya has found criticism difficult to respond to.</h4>
        <p>When she feels exposed, she tends to answer briefly, leave the conversation, and replay it afterward. The practitioner wants to help her find a little more space before that first reaction takes over.</p>
        <div className="context-callout"><span>Why this matters</span><strong>A pause creates room to notice what is happening, check the first story, and choose what to say next.</strong></div>
      </div>
      <aside className="context-focus">
        <span className="section-label">Today’s focus</span>
        <h4>Pause before responding</h4>
        <p>This session is designed to develop:</p>
        <div className="faculty-pills">{faculties.map((faculty) => <span key={faculty}>{faculty}</span>)}</div>
        <div className="context-session"><small>The session</small><strong>One real situation</strong><span>Notice → explore → choose what to carry forward</span></div>
      </aside>
    </div>
    <div className="guided-action-row"><ContinueButton onNext={onNext}>Share the focus with Maya</ContinueButton><span>Next: Maya brings in her situation</span></div>
  </>
}

function SituationStep({ onNext }: { onNext: () => void }) {
  const [showDetails, setShowDetails] = useState(true)
  return <>
    <StepIntro label="02 · Maya’s situation" title="Start with what actually happened." copy="Maya brings a real moment into the focus her practitioner has set. The product works with her account before offering an interpretation." />
    <div className="situation-workspace">
      <div className="situation-header"><span className="section-label">Maya’s words</span><span className="guided-status">Real situation</span></div>
      <h4>Feedback in a review meeting</h4>
      <blockquote>“{livedAccount}”</blockquote>
      <button className="details-toggle" onClick={() => setShowDetails(!showDetails)}>{showDetails ? 'Hide the details' : 'See the details'} <span>{showDetails ? '↑' : '↓'}</span></button>
      {showDetails && <div className="situation-details"><div><small>Felt and noticed</small><p>Exposed, embarrassed, tightness in my chest.</p></div><div><small>Thought or assumed</small><p>“I am failing again. They can see I am not good enough.”</p></div><div><small>Said and did</small><p>I answered briefly, said I would fix it, and wanted to leave.</p></div><div><small>Wanted or protected</small><p>I wanted to understand what was missing without feeling judged.</p></div></div>}
    </div>
    <div className="guided-action-row"><ContinueButton onNext={onNext}>See what the situation may show</ContinueButton><span>Next: Maya checks the mapping</span></div>
  </>
}

function MappingStep({ onNext }: { onNext: () => void }) {
  const [decisions, setDecisions] = useState<Record<string, 'keep' | 'change' | undefined>>({})
  const decide = (key: string, value: 'keep' | 'change') => setDecisions((current) => ({ ...current, [key]: value }))
  const confirmed = Object.values(decisions).filter(Boolean).length
  return <>
    <StepIntro label="03 · Maya checks the mapping" title="Does this fit your experience?" copy="The product maps possible patterns to Maya’s words. Maya stays in control of what the practitioner receives." />
    <div className="mapping-workspace">
      <div className="mapping-account"><span className="section-label">From Maya’s situation</span><blockquote>“I felt exposed and immediately started thinking that I was failing again. I answered briefly and wanted to leave.”</blockquote><span className="guided-authorship">Client-authored</span></div>
      <div className="mapping-observations"><span className="section-label">Possible connections</span><MappingCard title="The reaction came quickly" copy="Feeling exposed may have made leaving feel safer than staying with the conversation." faculty="Emotion awareness · self-regulation" decision={decisions.reaction} onDecide={(value) => decide('reaction', value)} /><MappingCard title="The first story narrowed the options" copy="“I am failing again” appeared before Maya could explain what she needed or ask what mattered most." faculty="Attention · judgment · flexibility" decision={decisions.story} onDecide={(value) => decide('story', value)} /><div className="mapping-correction"><span className="section-label">Maya’s own correction</span><p>“The important part is not becoming calm immediately. It is noticing that I have more than one possible next step.”</p></div></div>
    </div>
    <div className="mapping-send"><div><strong>{confirmed ? `${confirmed} connection${confirmed === 1 ? '' : 's'} reviewed` : 'Review the connections before continuing'}</strong><span>{confirmed ? 'The confirmed mapping will travel with Maya’s transfer response.' : 'Keep what fits. Change what needs more context.'}</span></div></div>
    <div className="guided-action-row"><ContinueButton onNext={onNext} disabled={confirmed === 0}>Try another response</ContinueButton><span>{confirmed ? 'Next: transfer exercise' : 'Review at least one connection to continue'}</span></div>
  </>
}

function MappingCard({ title, copy, faculty, decision, onDecide }: { title: string; copy: string; faculty: string; decision?: 'keep' | 'change'; onDecide: (value: 'keep' | 'change') => void }) {
  return <article className={decision ? 'mapping-card decided' : 'mapping-card'}><div><small>{faculty}</small><h4>{title}</h4><p>{copy}</p></div><div className="mapping-actions"><button className={decision === 'keep' ? 'mapping-choice active' : 'mapping-choice'} onClick={() => onDecide('keep')}>{decision === 'keep' ? 'Kept ✓' : 'This fits'}</button><button className={decision === 'change' ? 'mapping-choice change active' : 'mapping-choice change'} onClick={() => onDecide('change')}>{decision === 'change' ? 'Needs context ✓' : 'Needs context'}</button></div></article>
}

function TransferStep({ onNext }: { onNext: () => void }) {
  const [started, setStarted] = useState(false)
  return <>
    <StepIntro label="04 · Transfer exercise" title="Try the moment with a little more room." copy="The situation stays recognisable, but one condition changes. Maya responds before the product explains what it might mean." />
    <div className="transfer-workspace">
      <div className="transfer-prompt"><span className="section-label">A changed version of the moment</span><h4>The same review meeting, with more time and support afterward.</h4><p>Your manager points out the same gaps. This time, you have the evening free and someone you trust is available afterward. What do you say or do before leaving?</p><button className="warmup-reveal" onClick={() => setStarted(true)}>{started ? 'Maya has responded' : 'See Maya’s response'} <span>{started ? '✓' : '→'}</span></button></div>
      <div className={started ? 'transfer-response revealed' : 'transfer-response'}><span className="section-label">Maya’s response</span>{started ? <><blockquote>“I would still feel the embarrassment, but I might ask which gap matters most and say that I want to come back with a clearer version tomorrow. Knowing I could talk it through afterward makes it less urgent to escape.”</blockquote><span className="guided-authorship">Client response</span></> : <p className="transfer-awaiting">Her response will appear here after she tries the changed situation.</p>}</div>
    </div>
    <div className="guided-action-row"><ContinueButton onNext={onNext} disabled={!started}>Compare the two moments</ContinueButton><span>{started ? 'Response captured' : 'Try the changed situation first'}</span></div>
  </>
}

function ReportStep({ onNext }: { onNext: () => void }) {
  const [shared, setShared] = useState(false)
  return <>
    <StepIntro label="05 · Compare and send" title="Notice what changed." copy="Maya compares the original moment with her transfer response, adds what she wants her practitioner to know, and sends the complete report." />
    <div className="report-workspace"><div className="report-column"><span className="section-label">Original moment</span><blockquote>“I felt exposed, thought I was failing again, answered briefly, and wanted to leave.”</blockquote><span className="guided-authorship">Maya’s situation</span></div><div className="report-column"><span className="section-label">Transfer response</span><blockquote>“I might ask which gap matters most and come back with a clearer version tomorrow.”</blockquote><span className="guided-authorship">Maya’s response</span></div></div>
    <div className="report-insight"><div><span className="section-label">Maya’s comparison</span><h4>The embarrassment stayed. The urge to escape became less urgent.</h4><p>More time and trusted support made another response easier to see.</p></div><div><span className="section-label">Confirmed mapping</span><p>“The important part is noticing that I have more than one possible next step.”</p></div></div>
    <div className="mapping-send report-share"><div><strong>{shared ? 'Complete report sent to the practitioner' : 'This is what the practitioner will receive'}</strong><span>{shared ? 'Maya’s situation, confirmed mapping, transfer response, and comparison.' : 'The mapping and transfer exercise stay together.'}</span></div><button className={shared ? 'share-report shared' : 'share-report'} onClick={() => setShared(true)}>{shared ? 'Sent ✓' : 'Send the complete report →'}</button></div>
    <div className="guided-action-row"><ContinueButton onNext={onNext} disabled={!shared}>See the practitioner’s response</ContinueButton><span>{shared ? 'Next: practitioner feedback' : 'Send the report to continue'}</span></div>
  </>
}

function ResponseStep({ onRestart }: { onRestart: () => void }) {
  return <>
    <StepIntro label="06 · Practitioner response" title="Turn the insight into the next session." copy="The practitioner sees Maya’s situation, confirmed mapping, transfer response, and comparison before setting a focused next step." />
    <div className="response-workspace">
      <div className="response-confirmed"><span className="section-label">Complete report from Maya</span><h4>There may be more than one possible next step.</h4><p>She noticed the urge to leave, while also seeing that more time and trusted support made it easier to ask which gap mattered most.</p><div className="response-evidence"><small>Transfer response</small><strong>Ask which gap matters most and come back with a clearer version.</strong></div><span className="guided-authorship">Shared by Maya</span></div>
      <div className="response-practitioner"><span className="section-label">Practitioner’s response</span><blockquote>“You noticed the urge to leave before deciding what you wanted to say. In our next session, let’s practise one direct sentence while keeping that pause available.”</blockquote><span className="guided-authorship">Written by the practitioner</span></div>
    </div>
    <div className="next-session-card"><div><span className="section-label">Next session</span><h4>Pause, then say one direct sentence</h4><p>Start with the same focus. Add a short communication exercise so Maya can practise saying what she needs.</p></div><div className="next-session-details"><small>Focus</small><strong>Pause + communication</strong><small>Bring</small><strong>One upcoming conversation</strong><small>Look for</small><strong>One sentence before leaving</strong></div></div>
    <div className="guided-complete"><strong>The loop is complete.</strong><p>Context → situation → shared mapping → next session.</p><button className="secondary-button" onClick={onRestart}>Run the demo again</button></div>
  </>
}

function StepIntro({ label, title, copy }: { label: string; title: string; copy: string }) {
  return <div className="guided-step-intro"><p className="kicker">{label}</p><h3>{title}</h3><p>{copy}</p></div>
}
