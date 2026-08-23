# Architecture

Room to Respond is a review prototype built around one seeded coach-led workout.

## Runtime surfaces

- `src/App.tsx` owns the three top-level surfaces: landing page, guided demo, and privacy boundary.
- `src/components/Welcome.tsx` renders the product story and the entry points into the guided demo and privacy boundary.
- `src/components/GuidedDemo.tsx` renders the complete six-step Maya workout, including the orientation screen before the workout begins.
- `src/components/Privacy.tsx` explains the privacy and safety boundary for the seeded review prototype.
- `src/styles.css` contains the visual system for the landing page, guided demo, navigation, and responsive states.

## Guided demo state

The demo keeps one local state value: the current screen. The six workout screens are:

1. coach sets the focus;
2. Maya looks at a moment from her life;
3. Maya checks the reflection;
4. Maya tries another response;
5. Maya reviews and sends the reflection;
6. the coach responds and sets the next workout.

The orientation screen explains the journey before the first workout screen and does not count as an additional workout step. All content is seeded so a reviewer can complete the journey without entering personal information or configuring an API key.

## Product boundary

This branch contains the guided review prototype. It does not include the earlier self-service reflection flow, long-form account mapper, hosted model routes, local practice history, or client account system. Those are future product work and should be reintroduced only when they have a defined place in the coach-led product model.

Production work will need explicit identity, permissions, secure sharing, storage, model routing, deletion, and recovery decisions. None of those are implied by this seeded demo.
