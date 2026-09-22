// Snapshot of the live Notion assignment pages, retrieved 2026-09-22.
globalThis.RUBRICS = [
  {
    "id": "A1",
    "title": "Basic Movement",
    "url": "https://app.notion.com/p/3c188488af498089b80acea8884be479",
    "edited": "2026-09-02T16:45:10.569Z",
    "workInProgress": false,
    "features": [
      {
        "number": 1,
        "title": "Object moves in real time along independent world-space axes (e.g. A/D → left/right, W/S → forward/back) strafe mapping, not a tank-control scheme",
        "short": "Real-time world-space movement",
        "core": true
      },
      {
        "number": 2,
        "title": "Movement speed is independent of framerate",
        "short": "Framerate-independent movement speed",
        "core": true
      },
      {
        "number": 3,
        "title": "Movement values are exposed via the Inspector, not hardcoded",
        "short": "Movement values exposed in Inspector",
        "core": true
      },
      {
        "number": 4,
        "title": "Movement has the same speed diagonally as it does along axes",
        "short": "Equal diagonal movement speed",
        "core": false
      },
      {
        "number": 5,
        "title": "Player object is saved as a Prefab",
        "short": "Player saved as a Prefab",
        "core": false
      },
      {
        "number": 6,
        "title": "Holding Left Shift sprints using an Inspector-exposed running speed",
        "short": "Left Shift sprint with exposed speed",
        "core": false
      },
      {
        "number": 7,
        "title": "Camera is parented to the Player object so it follows the player",
        "short": "Camera parented to Player object",
        "core": false
      }
    ],
    "scale": [
      {
        "score": 10,
        "text": "items 1–7 all work!"
      },
      {
        "score": 8,
        "text": "items 1–3 work, but one of items 4–7 does not"
      },
      {
        "score": 6,
        "text": "items 1 and 2 work, but item 3 does not (or two of items 4–7 do not)"
      },
      {
        "score": 4,
        "text": "item 1 or item 2 fails (or several of items 4–7 do not)"
      },
      {
        "score": 2,
        "text": "both items 1 and 2 fail"
      },
      {
        "score": 0,
        "text": "doesn't compile, or you can't explain your own work"
      }
    ]
  },
  {
    "id": "A2",
    "title": "Gameplay & Spawners",
    "url": "https://app.notion.com/p/3c188488af4980b1a04ae6b379c7db5a",
    "edited": "2026-09-18T17:44:00.091Z",
    "workInProgress": false,
    "features": [
      {
        "number": 1,
        "title": "Spawner instantiates prefabs on a timed interval (Time.deltaTime accumulator, not unconditional every frame in Update)",
        "short": "Timed interval spawner",
        "core": true
      },
      {
        "number": 2,
        "title": "Spawner can be activated and deactivated in-game (e.g. via key press toggle or trigger switch), cleanly pausing and resuming instantiation",
        "short": "In-game spawner toggle (pause/resume)",
        "core": true
      },
      {
        "number": 3,
        "title": "Active spawned instances are tracked in a List with an enforced maximum capacity limit",
        "short": "Active instances tracked in List with capacity limit",
        "core": true
      },
      {
        "number": 4,
        "title": "Contact between player and spawned objects is detected via physics triggers (OnTriggerEnter) or collisions (OnCollisionEnter)",
        "short": "Contact detection via triggers or collisions",
        "core": true
      },
      {
        "number": 5,
        "title": "Contact triggers a visible game state change (e.g. score variable updating in the Inspector or Console)",
        "short": "Visible game state change on contact",
        "core": true
      },
      {
        "number": 6,
        "title": "Spawned objects are despawned/destroyed (Destroy(gameObject)) upon collection",
        "short": "Despawn/destroy on collection",
        "core": false
      },
      {
        "number": 7,
        "title": "Spawned objects leaving the play area are destroyed (boundary trigger volume or position check in Update). To show that, drag the spawned object DURING play mode while in the Scene view to show it being destroyed at runtime. A lifetime timer where the collectible destroys itself after a certain amount of time is also accepted for this checklist item.",
        "short": "Out-of-bounds / lifetime cleanup",
        "core": false
      },
      {
        "number": 8,
        "title": "Destroyed object references are cleared from the active list without null-reference errors, decrementing the list count",
        "short": "Destroyed references cleared from active list",
        "core": false
      }
    ],
    "scale": [
      {
        "score": 10,
        "text": "Items 1–8 all work cleanly!"
      },
      {
        "score": 8,
        "text": "All Core items (1–5) work, but one Supporting item (from 6–8) does not (e.g. pickups work and list prunes, but out-of-bounds cleanup was missed)."
      },
      {
        "score": 6,
        "text": "All Core items (1–5) work, but two Supporting items fail — OR exactly one Core item fails while Supporting items work. (Minimum grade required to count as a passing assignment for the drop-lowest-grade reward)."
      },
      {
        "score": 4,
        "text": "One Core item fails and multiple Supporting items fail — OR two Core items fail."
      },
      {
        "score": 2,
        "text": "Three or more Core items fail, but the project compiles, runs, and you can explain your own code."
      },
      {
        "score": 0,
        "text": "Project does not compile, repo URL or video is missing on Canvas, or you cannot explain your own code in the video."
      }
    ]
  },
  {
    "id": "A3",
    "title": "Control & Interaction",
    "url": "https://app.notion.com/p/3c188488af498041a698c91c88352c7e",
    "edited": "2026-09-15T15:12:08.702Z",
    "workInProgress": false,
    "features": [
      {
        "number": 1,
        "title": "Movement input is configured and read through an Input Actions asset (.inputactions Action Map and 2D Vector Composite bindings, not direct device polling or legacy Input.GetAxis)",
        "short": "Input Actions asset (.inputactions & composite bindings)",
        "core": true
      },
      {
        "number": 2,
        "title": "A responsive first-person camera (child camera with body yaw and clamped pitch [-90f, 90f] driven by /delta Input Action) makes movement legible, with look sensitivity exposed in the Inspector",
        "short": "First-person camera (yaw & clamped pitch)",
        "core": true
      },
      {
        "number": 3,
        "title": "Player moves via a CharacterController component with gravity accumulation and a grounding check (isGrounded), with movement speed exposed in the Inspector",
        "short": "CharacterController movement & gravity",
        "core": true
      },
      {
        "number": 4,
        "title": "An action-driven Jump, read through the same Input Actions asset as Move, and dependant on isGrounded so it cannot trigger mid-air, with jump height exposed in the Inspector",
        "short": "Action-driven grounded Jump",
        "core": true
      },
      {
        "number": 5,
        "title": "At least one collectible detects player contact (OnTriggerEnter) and is collected on touch, despawning it and registering in game state (e.g. score)",
        "short": "Collectible pickup & state update",
        "core": true
      },
      {
        "number": 6,
        "title": "At least one power-up responds to a deliberate aimed action rather than contact: a camera raycast finds it and an Interact action, read through the same Input Actions asset, activates it — temporarily boosting the Player's movement speed and reverting on expiration via a Coroutine or a tracked expiry time.",
        "short": "Aimed raycast power-up & timed speed boost",
        "core": false
      },
      {
        "number": 7,
        "title": "At least one hazard object detects player contact and causes a visible impact (damage, knockback, or respawn)",
        "short": "Hazard contact & visible impact",
        "core": false
      }
    ],
    "scale": [
      {
        "score": 10,
        "text": "Items 1–7 all work cleanly."
      },
      {
        "score": 8,
        "text": "All Core items (1–5) work, but one Supporting item (6 or 7) is missing or fails."
      },
      {
        "score": 6,
        "text": "Exactly one Core item fails while at least one Supporting items (6 or 7) works. This is the minimum grade that counts as a passing assignment for the drop-lowest-grade reward."
      },
      {
        "score": 4,
        "text": "Exactly two Core items fail."
      },
      {
        "score": 2,
        "text": "Three or more Core items fail, but the project compiles, runs, and you can explain your own code."
      },
      {
        "score": 0,
        "text": "The project does not compile, the repo URL or video is missing on Canvas, or you cannot explain your own code in the video."
      }
    ]
  },
  {
    "id": "A4",
    "title": "Sound, UX and FX",
    "url": "https://app.notion.com/p/3c188488af4980abb025e032bab7cfd1",
    "edited": "2026-09-22T12:05:02.938Z",
    "workInProgress": false,
    "features": [
      {
        "number": 1,
        "title": "Point-and-click locomotion via NavMeshAgent: clicking walkable ground sends the character there, with a destination marker and a confirmation sound at the click point",
        "short": "NavMesh click locomotion, marker & sound",
        "core": true
      },
      {
        "number": 2,
        "title": "A pursuing agent follows the player and costs health on contact at a controlled rate — a cooldown, or another way of stopping sustained contact from draining the bar",
        "short": "Pursuing agent with rate-limited damage",
        "core": true
      },
      {
        "number": 3,
        "title": "Responsive dual-anchor HUD: score and health both update live, pinned to opposite screen edges, and hold across aspect ratios",
        "short": "Dual-anchor responsive HUD",
        "core": true
      },
      {
        "number": 4,
        "title": "Every contact event is felt, and the power-up does its job: pickup, being hit, and power-up activation each have a sound and a particle effect, and the power-up speeds the character up for a limited time before reverting",
        "short": "Audio & particle FX for pickup, hit, power-up",
        "core": true
      },
      {
        "number": 5,
        "title": "In the video, you explain what the move click, HUD, pickup, hit and power-up feedback each tell the player, or what confusion they remove — not just that they work",
        "short": "Video explanation of UX feedback rationale",
        "core": true
      },
      {
        "number": 6,
        "title": "A click that lands on the level somewhere the agent cannot reach (a wall, or a platform it cannot reach) gets a distinct response, clearly different from a confirmed move",
        "short": "Distinct response for unreachable clicks",
        "core": false
      },
      {
        "number": 7,
        "title": "Sound is placed deliberately: at least one source is partially 3D and clearly audible from where the listener is (the pursuer is the obvious candidate), and at least one is 2D",
        "short": "Deliberate audio spatial placement (2D & 3D)",
        "core": false
      }
    ],
    "scale": [
      {
        "score": 10,
        "text": "Items 1–7 all work."
      },
      {
        "score": 8,
        "text": "All Core items (1–5) work, but at least one Supporting item (6 or 7) does not."
      },
      {
        "score": 6,
        "text": "Exactly one Core item fails, while both Supporting items work. For example, the feedback is all there but the video only shows it and never explains the reasoning."
      },
      {
        "score": 4,
        "text": "Two Core items fail, or one Core item fails and at least one Supporting item fails as well."
      },
      {
        "score": 2,
        "text": "Three or more Core items fail, but the project compiles, runs, and you can explain your own code."
      },
      {
        "score": 0,
        "text": "The project does not compile, the repo URL or video is missing on Canvas, or you cannot explain your own code in the video."
      }
    ]
  },
  {
    "id": "A5",
    "title": "Webcam Marker AR",
    "url": "https://app.notion.com/p/3c188488af4981c99bc8e9ad984758a6",
    "edited": "2026-09-12T20:05:04.746Z",
    "workInProgress": true,
    "features": [
      {
        "number": 1,
        "title": "An image target is detected through the webcam in Play Mode",
        "short": "Webcam image target detection",
        "core": true
      },
      {
        "number": 2,
        "title": "A 3D object is anchored to the marker, appearing when it is tracked and disappearing when tracking is lost",
        "short": "3D object anchored to marker (track/lost)",
        "core": true
      },
      {
        "number": 3,
        "title": "At least one user interaction changes the anchored object, driven by your own script",
        "short": "User interaction script altering object",
        "core": true
      },
      {
        "number": 4,
        "title": "The 3–5 sentence note mapping the prototype to Week 6's XR concepts is submitted alongside the video",
        "short": "XR concept note submitted with video",
        "core": true
      },
      {
        "number": 5,
        "title": "Tracking is stable enough to interact with. It does not have to be perfect, just usable",
        "short": "Stable, usable tracking",
        "core": false
      }
    ],
    "scale": [
      {
        "score": 10,
        "text": "Items 1–5 all work."
      },
      {
        "score": 8,
        "text": "All Core items (1–4) work, but item 5 does not. Tracking is present but too jittery to actually use."
      },
      {
        "score": 6,
        "text": "Exactly one Core item fails. For example, everything works but the concept note was not submitted. This is the minimum grade that counts as a passing assignment for the drop-lowest-grade reward."
      },
      {
        "score": 4,
        "text": "Exactly two Core items fail."
      },
      {
        "score": 2,
        "text": "Three or more Core items fail, but the project runs and you can explain your own code."
      },
      {
        "score": 0,
        "text": "The project does not run, the repo URL or video is missing on Canvas, or you cannot explain your own code in the video."
      }
    ]
  },
  {
    "id": "A6",
    "title": "VR Basics",
    "url": "https://app.notion.com/p/3c188488af49811294bec19234be5215",
    "edited": "2026-09-12T20:05:15.708Z",
    "workInProgress": true,
    "features": [
      {
        "number": 1,
        "title": "Teleportation locomotion works",
        "short": "Teleportation locomotion",
        "core": true
      },
      {
        "number": 2,
        "title": "At least two distinct objects can be grabbed",
        "short": "Two distinct grabbable objects",
        "core": true
      },
      {
        "number": 3,
        "title": "Grabbed objects can be placed in a socket or trigger to complete the stated goal, with some observable confirmation (visual or audio cue, Debug.Log, or Inspector value — no full UI needed)",
        "short": "Socket/trigger placement completing goal",
        "core": true
      },
      {
        "number": 4,
        "title": "At least one working building block from an earlier assignment (UI, menu, audio, or FX) is reused in the scene",
        "short": "Reused building block from earlier assignment",
        "core": false
      }
    ],
    "scale": [
      {
        "score": 10,
        "text": "Items 1–4 all work, shown running on a headset."
      },
      {
        "score": 8,
        "text": "All Core items (1–3) work, but item 4 is missing or does not function."
      },
      {
        "score": 6,
        "text": "Exactly one Core item fails. For example, teleportation and grabbing work but the goal cannot quite be completed. This is the minimum grade that counts as a passing assignment for the drop-lowest-grade reward."
      },
      {
        "score": 4,
        "text": "Exactly two Core items fail."
      },
      {
        "score": 2,
        "text": "All three Core items fail, but the scene runs and you can explain your own code."
      },
      {
        "score": 0,
        "text": "The scene does not run, the repo URL or video is missing on Canvas, or you cannot explain your own code in the video."
      }
    ]
  }
];
