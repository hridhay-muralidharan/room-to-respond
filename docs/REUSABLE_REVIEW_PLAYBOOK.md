# Reusable product review playbook

This document records the working lessons from the Room to Respond build. It is intended for this repository and for future product repositories that need a coherent, reviewable prototype.

## The main lesson

Hold the whole product in view before improving one screen.

A useful local change can still damage the product if it weakens the story, changes the user's role, breaks the handoff, or sends the user to the wrong place. Review every change at two levels:

- **Forest:** What should the person understand, feel, and do across the whole experience?
- **Tree:** Is this sentence, button, section, state, or transition doing that job clearly?

Do not let a narrow task silently replace the larger product objective.

## Start with a product model

Before changing copy or UI, write down:

1. the audience and the situation in which they arrive;
2. the product promise in one sentence;
3. the complete journey from entry to outcome;
4. the roles involved and what each role is responsible for;
5. the handoffs between roles;
6. the evidence, research, and hypotheses behind the product;
7. the one thing the prototype must prove.

For Room to Respond, the core loop is:

`coach identifies a development blocker → client notices it in life → client reflects on what they felt, thought, said, and did → the system reflects it back → client tries another response → client shares the reflection → coach responds → client carries the learning into life and the next session`

Every screen and CTA should make one part of this loop clearer.

## Copy rules that consistently worked

### Use ordinary verbs

Prefer:

- `look at` over `bring in`;
- `think of a moment from your life` over `describe a real situation`;
- `check the reflection` over `confirm the mapping`;
- `try another response` over `complete the transfer exercise`;
- `send it to your coach` over `submit a report for practitioner review`;
- `what changed` over `evolution model` when speaking to a first-time user.

Use research terms in supporting material when they add precision. Keep the product interface in the language of the person's task.

### One idea per sentence

LLMs often compress several actions into one sentence. Split it when the reader has to track more than one actor, action, or outcome.

Weak pattern:

`The coach turns the pattern into a focused workout, the client examines a moment, and the system prepares a reviewable handoff.`

Clearer pattern:

`The coach sets the focus. The client looks at a moment from life. The coach receives the reflection.`

### Name the actor

Avoid sentences where “the work”, “the model”, “the routine”, or “the system” appears to act without a clear purpose. Say who does what: coach, client, Room to Respond, or model.

### Do not make the reader translate internal language

Words such as `mapping`, `transfer`, `handoff`, `development blocker`, `faculty`, and `constructed situation` can be useful in product and research documents. They should not lead a first-time user through a demo unless the interface explains them in ordinary language.

### Make every CTA truthful

The CTA must describe what the reviewer is actually doing and what they will see next.

- If the reviewer is watching a prepared demo, do not ask them to `Share the focus with Maya`.
- Use `See Maya’s starting point` or `Start the workout`.
- Do not use `Continue` when the next screen is important enough to name.
- Do not use an internal action label as a public CTA.

### Remove vague nouns

Review every noun that could mean several things:

- `change` → `a new situation`, `a difficult conversation`, or `a new response`;
- `the work` → `the reflection`, `the conversation`, or `the workout`;
- `next step` → the actual next action;
- `support` → more time, a trusted person, or a coach's feedback;
- `pattern` → the observable sequence, when the user needs to see it.

## Landing-page method

The landing page should tell one story in order. Give each section one job:

1. **Promise:** what the product is and why it matters;
2. **Range:** what kinds of mental development can be practised;
3. **Routine:** what one workout looks like;
4. **Relationship:** what the coach does and what the client does;
5. **Reason:** why this category matters now;
6. **GenAI:** what becomes possible through adaptation;
7. **Demo:** what the reviewer will see next.

Before shipping, read the sections in sequence and remove any section that repeats the previous one without advancing the story.

## Guided-demo method

Do not begin a seeded guided demo with a screen that assumes context the landing page did not provide.

Use a short orientation screen before the first step when the reviewer needs to understand:

- who the people are;
- why the workout exists;
- what the reviewer is about to see;
- whether they need to write anything;
- how the journey ends.

The orientation screen is an entry point, not an extra workout step. Keep the persistent journey header stable. Show the step rail only once the six-step journey begins.

Each step should have:

- one purpose;
- one visible source of truth;
- one clear next action;
- clear authorship: coach, client, or model;
- a natural transition to the next step.

## Navigation and scroll review

Navigation needs its own test pass. Do not infer that a button works because its state changes.

Test every transition from:

- the top, middle, and bottom of each page;
- each primary CTA;
- the wordmark, local back button, and global navigation;
- Privacy and any other interrupting surface;
- the first guided screen and every later guided step;
- mobile and desktop widths.

For single-page guided journeys:

- entering the journey starts at the top;
- moving to a later step scrolls to the new step, not the persistent header;
- the persistent header does not change between steps;
- returning from an interrupting surface restores the page and state the user came from;
- a CTA at the bottom of a page must not open the next page at its bottom.

## Review as four people

Run the prototype through four lenses before freezing it:

- **First-time reviewer:** Can I explain what this is without reading the repository?
- **Intended user:** Do I know why I am being asked to do this and what happens to my words?
- **Coach or domain expert:** Does the workflow resemble a real relationship and a real handoff?
- **Builder:** Do state, authorship, fallback, navigation, and accessibility remain explicit?

Add a UX writer lens separately. Ask whether a person would actually say each sentence aloud. If not, simplify it.

## What the commit and deployment history taught us

The GitHub branch grew through 93 commits. The history shows several useful phases:

- initial product and research exploration;
- first-principles faculty and category reset;
- naming and product-story reset;
- landing-page and guided-demo construction;
- role, authorship, and interaction clarification;
- coach/client language correction;
- navigation, scroll, orientation, and copy refinements.

The repeated failure patterns were:

- solving the most recent sentence while losing the product story;
- preserving old terminology after the product model changed;
- writing for the repository instead of the first-time reader;
- using a correct idea in language no person would say;
- treating a seeded demo as if the reviewer were the coach or client;
- force-fitting physical-workout terms into every screen;
- changing the UI state without checking scroll position and the next visible section;
- checking the source code without walking the deployed preview from the user's entry point.

The Vercel project accumulated many ready preview deployments during these iterations. That was useful for comparison, but it also showed the need for deployment discipline:

1. deploy after a coherent change set, not every isolated thought;
2. record the commit and preview URL together;
3. review the newest preview from a clean entry point;
4. keep one named candidate preview for freeze review;
5. do not call the product frozen until the GitHub branch, build, and live preview all point to the same commit.

## Freeze checklist

Before freezing a prototype:

- [ ] the product story can be stated in one paragraph;
- [ ] each landing section has one job and no unnecessary repetition;
- [ ] the first-time reviewer understands the guided demo before the first action;
- [ ] all roles and handoffs are explicit;
- [ ] every CTA describes the next visible outcome;
- [ ] no user-facing copy requires translation from internal product language;
- [ ] the persistent frame is stable across a multi-step journey;
- [ ] all page and step transitions have been tested from the bottom of the previous view;
- [ ] content contrast is readable in every visual state;
- [ ] `npm run build` passes;
- [ ] `git diff --check` passes;
- [ ] the branch is clean and pushed;
- [ ] the Vercel preview is Ready and matches the final commit;
- [ ] the final preview has been reviewed as a first-time human, not only inspected in code.

This is the minimum review discipline needed to avoid repeating the same class of correction in the next repository.
