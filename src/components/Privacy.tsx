type Props = { onBack: () => void }

export function Privacy({ onBack }: Props) {
  return <section className="privacy-page page-narrow">
    <button className="back-button" onClick={onBack}>← Back</button>
    <p className="kicker">Privacy and safety</p>
    <h2>A practice should feel private.</h2>
    <p className="privacy-lede">Room to Respond is designed for intimate moments, personal patterns, and reflections that a client may want to discuss with a coach. The coach-client relationship remains human-led.</p>
    <div className="privacy-list">
      <div><span>01</span><div><h3>What this demo contains</h3><p>This guided demo uses fictional, seeded content. It does not ask the reviewer to enter a personal situation or create an account.</p></div></div>
      <div><span>02</span><div><h3>What the product is designed for</h3><p>A future product would give the client control over what is stored, what is shared with the coach, and what is sent for model assistance.</p></div></div>
      <div><span>03</span><div><h3>Support stays human-led</h3><p>Therapy, coaching, diagnosis, risk assessment, crisis support, treatment recommendations, and care decisions belong with qualified professionals and services.</p></div></div>
    </div>
  </section>
}
