// TA observation prompts derived from the assignment descriptions. These do not add rubric criteria.
globalThis.GUIDANCE = {
 A1: [
  ['Show A/D moving left/right and W/S forward/back without turning the object.', 'In Mover.cs, inspect Keyboard.current input and a combined world-space X/Z direction. Movement must be custom scripted. Tank controls do not satisfy this item.'],
  ['Watch for consistent movement speed; ask where frame-rate independence happens.', 'Find Time.deltaTime applied to displacement. Trace the actual movement path; merely mentioning deltaTime in unused code is not evidence.'],
  ['Show movement settings on the selected player in the Inspector.', 'Check that serialized fields (public or [SerializeField]) feed the movement calculation rather than unused fields beside hardcoded speeds.'],
  ['Compare diagonal movement with a single axis over a similar interval.', 'Check normalization or clamping of the combined direction before speed is applied. Independently adding full X and Z speeds causes a diagonal boost.'],
  ['Show the Player prefab asset and the player in the scene.', 'Inspect Assets/Prefabs/Player.prefab and its movement component. A renamed scene object alone is not a prefab.'],
  ['Hold Left Shift while moving, then release it; speed should increase and return.', 'Trace the Shift condition to a separate Inspector-exposed running speed. Confirm the running speed is actually used.'],
  ['Move the player and show the Main Camera beneath Player in the Hierarchy.', 'Check the camera’s parent and local offset. A camera that follows through a separate script does not meet the stated parenting criterion.']
 ],
 A2: [
  ['Watch several spawn intervals; instances should appear rhythmically, not every frame.', 'In Spawner.cs, find the Time.deltaTime accumulator, interval comparison and timer reset/subtraction. Instantiate must be conditional.'],
  ['Toggle the spawner off, wait, then on during Play Mode. Spawning pauses and resumes.', 'Trace the input or trigger to the active flag. Inactive state should pause instantiation and timer accumulation. An Inspector-only toggle is not the requested in-game control.'],
  ['Expand the active list in the Inspector and wait until capacity is reached.', 'Confirm spawned instances enter List<GameObject> and a capacity check prevents extra spawns. A spawn counter without an active list is insufficient.'],
  ['Move the player into a spawned object and show the contact being detected.', 'Inspect OnTriggerEnter or OnCollisionEnter, player filtering, colliders and Rigidbody setup. For the template trigger setup, the collectible has a trigger collider and kinematic Rigidbody.'],
  ['Show score or another state value change after contact. Inspector or Console evidence is sufficient.', 'Follow the contact callback into the state update. No HUD is required; do not deduct for the absence of one.'],
  ['Collect an object and show it disappear from the scene/Hierarchy.', 'Find Destroy(gameObject) or equivalent despawning in the collection path. Hiding a mesh while leaving an active collectible is not cleanup.'],
  ['During Play Mode, drag an instance outside the arena in Scene view, or show it expire via a lifetime timer.', 'Accept a boundary trigger, position check, or lifetime timer. The current Notion checklist explicitly accepts timed destruction; objects need not move away by themselves.'],
  ['After collection and boundary/lifetime cleanup, show the list count drop and spawning resume without errors.', 'Inspect removal of destroyed references on each destruction path. Check that list mutation is safe and stale entries do not permanently consume capacity.']
 ],
 A3: [
  ['Show the .inputactions asset, Move action and composite bindings, then demonstrate movement.', 'Inspect the Action Map and 2D Vector composites (WASD and arrow keys in the brief), enabled actions and InputActionReference reading. Direct Keyboard.current polling or Input.GetAxis does not satisfy this item.'],
  ['Look left/right and up/down in first person. Pitch stops before the view flips.', 'Check the child camera, body yaw, pitch clamped to −90…90, a Look action bound to <Mouse>/delta and Inspector-exposed sensitivity.'],
  ['Show responsive movement, falling/landing, stairs and slopes in the test scene.', 'Trace CharacterController.Move, Time.deltaTime, gravity accumulation, isGrounded and exposed movement speed. Inspect controller step/slope settings as supporting evidence.'],
  ['Jump from the ground and try pressing Jump again in mid-air; no extra air jump should occur.', 'Read Jump from the same actions asset. Check isGrounded, exposed jumpHeight, initial upward velocity and ongoing gravity.'],
  ['Touch a collectible; it disappears and score or another game state changes.', 'Check OnTriggerEnter player filtering, destruction and state registration. An Inspector value or Debug.Log is acceptable state evidence.'],
  ['Aim at the power-up and press Interact. Show the speed boost start and expire.', 'Trace a camera raycast within range and Interact from the same actions asset. Check Coroutine/expiry timing and restoration of baseline speed. Touch-only activation does not satisfy this item.'],
  ['Touch a hazard and show damage, knockback or respawn.', 'Inspect contact detection and the actual penalty/state change. A hazard that only looks dangerous does not establish an impact.']
 ],
 A4: [
  ['Click walkable ground and show navigation, the destination marker and confirmation sound.', 'In ClickToMove.cs, inspect the camera raycast, Walkable layer mask, NavMeshAgent destination, marker and sound. All are part of this combined item.'],
  ['Let the pursuer approach and stay in contact. Health drops at controlled intervals rather than draining each frame.', 'In Chaser.cs, inspect refreshed destinations, contact handling and damage cooldown (or an equivalent rate limit). Check that sustained contact is handled.'],
  ['Collect an item and take a hit; score and health update. Resize the Game view or switch aspect ratios.', 'Check opposite-edge RectTransform anchors and CanvasScaler Scale With Screen Size (brief: 1280×720). Event-driven updates are preferred, but per-frame updates also pass this checklist.'],
  ['Demonstrate pickup, hit and power-up: each has sound and particles. Show speed rise temporarily and return.', 'Trace all three contact paths and audio/FX calls. Confirm the power-up changes agent speed for a limited time and restores it. Inspect particle lifetime and cleanup as diagnostic guidance.'],
  ['Listen for the purpose of five choices: move click, HUD, pickup, hit and power-up feedback.', 'Match each explanation to its implementation. “It plays a sound” is not a UX rationale; identify what it tells the player or which confusion it removes.'],
  ['Click a wall or unreachable platform. The response differs clearly from a confirmed move.', 'Inspect reachability/path handling and the refusal response. A raycast that misses the entire level may simply be ignored. SetDestination acceptance alone need not prove a complete reachable path.'],
  ['Hear a partially 3D source and a 2D source; listen as the pursuer approaches and hear why each was chosen.', 'Check Spatial Blend and listener position. The elevated camera can make floor-level 3D sounds too quiet; inspect Min Distance/listener placement. At least one audible partially 3D source and one 2D source are required.']
 ],
 A5: [
  ['Bring the printed marker into webcam view in Play Mode; demonstrate detection.', 'Inspect Vuforia ARCamera, Image Target configuration and tracking setup. Editor webcam Play Mode is sufficient; no phone build is required.'],
  ['Show the object follow the marker; remove the marker and show the content disappear.', 'Inspect the object under the Image Target and tracking-state handling. Check both tracked and lost states rather than assuming parenting proves visibility behavior.'],
  ['While tracking, press the input that changes colour, animation, model or another object property.', 'Inspect the student’s input script and the resulting object change. A Vuforia tracking event alone is not a user interaction.'],
  ['Read the submitted 3–5 sentence concept note alongside the Canvas video.', 'Check the connection to tracking modality, knowledge/limits of the real world, and the XR spectrum. A missing concept note fails this Core item, not the overall submission prerequisite.'],
  ['Move the marker a little and attempt the interaction. Tracking should remain usable.', 'Inspect scale and tracking setup if needed. Minor jitter is acceptable; do not require perfect tracking. Glare, weak print contrast and camera access can explain problems.']
 ],
 A6: [
  ['Show at least two teleports: aim at the floor, confirm and arrive.', 'Inspect XR locomotion/teleportation components, target colliders and interaction layers. Relate the shown behavior to the configured components.'],
  ['Pick up two distinct objects with the controllers.', 'Inspect grab interactables, colliders, Rigidbody and interaction layers on both objects. Picking up the same object twice is insufficient.'],
  ['State the placement goal, complete it using sockets/triggers and show confirmation.', 'Trace socket/trigger conditions into goal completion. Visual/audio feedback, Debug.Log or an Inspector value is enough; a full UI is not required.'],
  ['Show the reused UI, menu, audio or FX working and identify its earlier assignment.', 'Inspect the integrated component and its event wiring in the VR scene. An unused asset in the project does not count.']
 ]
};
