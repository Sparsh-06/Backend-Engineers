# ChatGPT/DALL-E image prompts - one per topic

Shared style block, prepend to every prompt below:

> Minimal abstract technical illustration, flat vector style, no photorealism, no text or labels in the image, no people or faces. Background is a warm off-white cream (#EEE9E3). Primary shapes and lines in pure black. Exactly one accent color, a bright orange-red (#ff4d00), used sparingly on only one or two key elements to draw the eye. Thin 1-2px line weights, generous negative space, geometric circles and straight/curved connector lines rather than icons or skeuomorphic detail. Feels like an editorial diagram from a modern engineering blog (Stripe/Vercel/Linear style), not a cartoon or clip art. Square or 3:2 aspect ratio.

---

## what-is-a-server
A single black filled circle labeled conceptually as a "process" sits center-frame with three thin lines radiating outward to smaller hollow circles representing open connections, one of the lines highlighted in orange. Suggests one program serving multiple simultaneous callers without looking like a literal computer or server rack.

## client-server-model
Two circles facing each other across the frame, one black (server) and one outlined (client), connected by two thin arced lines forming a loop - one line orange and arrowed left-to-right (request), the other black and arrowed right-to-left (response). Communicates a round-trip exchange, not a static diagram.

## url-to-response
A single thin horizontal line crossing the frame left to right, broken into five short segments by small circles at each junction (DNS, connect, TLS, request, response), the final segment ending in a small orange filled circle. Reads like a minimal timeline or train-stop diagram, not a network map.

## http-basics
A stack of three to four thin horizontal bars of varying short lengths, left-aligned like a minimalist bar chart, one bar filled solid orange and the rest black outlines only. Suggests structured, categorized data (status code families or header fields) without literal text.

## statelessness
Two identical black circles side by side, each with a small orbiting hollow ring around it that is disconnected and fading/dashed on one side - implying memory that doesn't persist between them. No connecting line between the two circles at all, reinforcing separateness.

## who-owns-what
Three vertically stacked horizontal bands of equal height separated by thin black lines, the topmost band mostly cream/empty, the middle band with a few small black dots, the bottom band with one orange dot - implying layered responsibility (frontend, backend, infrastructure) without literal icons.

## nodejs-event-loop
A single black ring (circle outline, not filled) with one small orange dot positioned on its circumference and a faint trailing arc behind it suggesting motion around the loop. Nothing inside the circle - pure motion/cycle implied by the trail, not a clock face.

## nodejs-async-io
A black circle on the left connected by a thin dashed line (not solid) to a smaller outlined circle on the right, with a small orange dot positioned mid-line as if traveling along it, not yet arrived. Dashed line implies work in progress without blocking, versus a solid completed connection.

## nodejs-worker-threads
One larger black circle at the top with three thinner lines branching downward to three smaller identical outlined circles, one of the three branch lines and its endpoint circle highlighted in orange. Suggests delegation/forking from one source to parallel workers.

## nodejs-streams
A horizontal row of five to six small identical circles evenly spaced left to right, connected by a single thin line running through all of them like beads, with a gradient of fill from hollow (left) to solid black (right) and the very last one solid orange. Implies discrete chunks flowing through a pipe, not a continuous river/wave shape.

## nodejs-gc
A loose cluster of eight to ten small circles scattered irregularly within a bounded square outline, most filled black (still referenced/alive) but two or three faded to a light gray outline only (unreachable/collected), with one faded circle mid-fade into orange as if actively being swept. Suggests memory space with some objects marked for cleanup.
