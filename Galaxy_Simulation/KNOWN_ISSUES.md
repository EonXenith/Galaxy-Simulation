# Known Issues & Improvement Areas

## Performance

1. ~~**O(n²) gravity & collision detection**~~ **PARTIALLY FIXED** — `index.html` now uses Barnes-Hut (O(n log n)) for gravity when body count exceeds 50. Collision detection is still O(n²).

2. **No Web Workers** — All physics runs on the main thread, so heavy simulations block the UI. Sliders, buttons, and camera controls become unresponsive when the frame budget is blown.

3. ~~**Runtime Babel transpilation**~~ **MITIGATED** — A loading screen now displays during Babel compilation so users see progress instead of a blank page. Full fix requires a build step (Vite, esbuild).

4. ~~**Per-body point lights on stars**~~ **FIXED** — Point lights capped to 4 (reduced from 8). Ambient and hemisphere lights compensate so all bodies remain visible. Stars beyond the cap still self-illuminate via MeshBasicMaterial.

## Reliability & Robustness

5. **CDN-only dependencies, no offline support** — React, Three.js, Tailwind, Babel, and Google Fonts all load from unpkg/CDN. A single CDN hiccup or offline user gets a blank page with no fallback or error message.

6. ~~**No error boundaries**~~ **FIXED** — ErrorBoundary component wraps the App, catching crashes and showing a recovery UI with a reload button. NaN guard added to physics to prevent silent corruption.

7. **Two divergent codebases** — `app.jsx` is an older, less-featured version. `index.html` is the primary app with all features. Consider removing `app.jsx` or auto-redirecting.

## Simulation Accuracy

8. **Softening constant** — `index.html` uses 0.5 with adaptive scaling for massive bodies, which is a reasonable compromise.

9. ~~**Fixed timestep with frame-skip on overload**~~ **FIXED** — Accumulator now caps to half a timestep instead of zeroing when maxSteps is reached. This prevents visible time jumps while keeping the safety cap.

10. **No energy/momentum monitoring** — Users have no way to know if the simulation is producing physically meaningful results or if numerical errors are accumulating. Displaying total energy would let users see if the simulation is stable.

## UX & Accessibility

11. ~~**No save/load in app.jsx**~~ — `index.html` (primary app) has full save/load. `app.jsx` is the legacy version.

12. ~~**No undo**~~ — `index.html` has full undo/redo (Ctrl+Z / Ctrl+Shift+Z), up to 50 states.

13. **No mobile/touch support** — Controls rely entirely on mouse events (left-click, right-drag, scroll wheel). The simulation is unusable on tablets or phones.

14. ~~**Minimal onboarding**~~ **FIXED** — Welcome overlay shows on first visit with controls reference, tool tips, and feature highlights. Dismissible and remembered via localStorage.

15. ~~**No responsive layout**~~ **FIXED** — Sidebar is now collapsible with a toggle button. Defaults to collapsed on screens narrower than 768px.

## Code Maintenance

16. **Monolithic files** — 1,120 lines in `app.jsx` and 2,500+ lines in `index.html` with physics, rendering, UI, and state all interleaved. This makes bugs hard to isolate and features hard to add without regressions.

17. **No tests** — Zero automated tests. Any change risks breaking simulation correctness or UI behavior silently.

## Highest-Impact Remaining Fixes

- Move physics to a Web Worker
- Add a proper build system to eliminate Babel overhead
- Consolidate/remove the `app.jsx` duplicate codebase
- Add mobile/touch support

## Fixed in Latest Update

- Physics accumulator capping (no more time jumps at high speed)
- Point light reduction (4 max) + hemisphere light for better baseline lighting
- Loading screen during Babel compilation
- ErrorBoundary for crash recovery + NaN guard in physics
- Welcome overlay for first-time users
- Collapsible sidebar for small screens
- Animation loop stability (refs instead of closured state, no unnecessary re-creation)
