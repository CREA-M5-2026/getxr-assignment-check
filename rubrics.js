// Snapshot of the live Notion assignment pages, retrieved 2026-09-22. A5 updated 2026-10-04; A6 rewritten 2026-10-10.
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
    "edited": "2026-10-04T13:03:03.234Z",
    "workInProgress": false,
    "features": [
      {
        "number": 1,
        "title": "Your own script keeps Doggy on the card with tag ID 1. He stands on it, follows it smoothly and is hidden while it is not in view",
        "short": "Doggy on his card (own script, tag ID 1)",
        "core": true
      },
      {
        "number": 2,
        "title": "While the treat is within a distance set in the Inspector, Doggy's jaw is open. It opens and closes smoothly through your script, and a sound that you provided plays as it opens",
        "short": "Jaw opens while the treat is close, with sound",
        "core": true
      },
      {
        "number": 3,
        "title": "After the treat has been in range for a time set in the Inspector, Doggy becomes happy: your script switches the supplied tail animation on, and a sound and a particle effect that you provided play. The tail stops when the treat leaves",
        "short": "Happy after hold time: tail wag, sound, particles",
        "core": true
      },
      {
        "number": 4,
        "title": "Losing the treat card or the dog card closes the jaw, ends the happy state and resets the timer. It works again when both cards return. A particle effect and a sound that you provided play when Doggy's card or the treat's card disappears, and when it appears. In the video you break tracking on purpose",
        "short": "Tracking loss resets; effects on appear/disappear",
        "core": true
      },
      {
        "number": 5,
        "title": "Doggy's head turns smoothly towards the treat, also when the dog card is turned, and stays within a turn limit set in the Inspector",
        "short": "Head follows the treat within a turn limit",
        "core": false,
        "tier": "9th point"
      },
      {
        "number": 6,
        "title": "Two dogs: a second Doggy on the card with tag ID 2, both dogs react to the treat, and they affect each other in at least one visible way that you invented",
        "short": "Two dogs that affect each other",
        "core": false,
        "tier": "10th point"
      }
    ],
    "scale": [
      {
        "score": 10,
        "text": "Items 1–6 all work."
      },
      {
        "score": 9,
        "text": "Items 1–5 work, but the two dogs do not work as described in item 6."
      },
      {
        "score": 8,
        "text": "All Core items (1–4) work, but the head does not follow the treat within its limit (item 5)."
      },
      {
        "score": 6,
        "text": "Exactly one Core item fails. For example, everything works but the happy state has no sound or particle effect. This is the minimum grade that counts as a passing assignment for the drop-lowest-grade reward."
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
    "edited": "2026-10-10T19:14:01.469Z",
    "workInProgress": false,
    "scoring": "points",
    "videoLabel": "Both recordings (Play + Desktop) submitted on Canvas",
    "guidanceLabels": [
      "Play recording",
      "Desktop recording"
    ],
    "features": [
      {
        "number": 1,
        "title": "Teleport and snap turn. The player pushes the thumbstick forward to aim at a Teleportation Area (the floor or the rug), releases it, and lands there. Pushing a thumbstick left or right turns the view in fixed steps.",
        "short": "Teleport and snap turn",
        "core": false,
        "points": 2,
        "tier": "2 points"
      },
      {
        "number": 2,
        "title": "Two grabbable objects. These can be your task objects from Part B. Both can be picked up. At least one has its own Attach Transform, so it is held at a sensible point such as a handle, not by its pivot.",
        "short": "Two grabbable objects, one with Attach Transform",
        "core": false,
        "points": 2,
        "tier": "2 points"
      },
      {
        "number": 3,
        "title": "Each task socket accepts only its own object. Holding the wrong object at a socket shows no preview and does not snap in.",
        "short": "Each socket accepts only its own object",
        "core": false,
        "points": 2,
        "tier": "2 points"
      },
      {
        "number": 4,
        "title": "Progress display. A world-space text shows placed / total, for example \"1/2\". The total comes from the number of sockets in the script's list, not a typed number. The count is based on which sockets hold an object (hasSelection) and updates both when an object is placed (selectEntered) and when it is taken out (selectExited). When Play starts it shows nothing placed, for example \"0/2\".",
        "short": "World-space progress display (placed / total)",
        "core": false,
        "points": 2,
        "tier": "2 points"
      },
      {
        "number": 5,
        "title": "Response when complete. When every socket is filled, an object in the room moves, rotates or fades to an \"open\" state over about a second or longer, not instantly. Use Lerp or MoveTowards in Update(). A sound or particle effect plays once at the moment the goal is completed, not every frame.",
        "short": "Gradual response on completion, effect once",
        "core": false,
        "points": 1,
        "tier": "1 point"
      },
      {
        "number": 6,
        "title": "Reversing. Taking any object out while the goal is complete moves the response smoothly back to its starting state, from wherever it is. Placing the object back opens it again and plays the effect again.",
        "short": "Response reverses when an object is removed",
        "core": false,
        "points": 1,
        "tier": "1 point"
      }
    ],
    "scale": [
      {
        "score": 10,
        "text": "All six items work as described and are shown in both recordings."
      },
      {
        "score": 6,
        "text": "Minimum grade that counts as a passing assignment for the drop-lowest-grade reward."
      },
      {
        "score": 0,
        "text": "The repo URL or recordings are missing on Canvas, the GitLab repository has no working Unity project, the scene does not run, or you cannot explain your own code in the desktop recording."
      }
    ]
  }
];
