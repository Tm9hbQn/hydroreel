# Walkthrough: Content Edits and Animation Splitting

## What was done
1. **Content Text Updates**:
   - Removed the word "מושלם" from the clinical highlight in the edema reduction bite.
   - Removed "בשיטת הליוויק" from the title of the turbulence clinical case to match the user's request.
2. **Amputee/Metacentric Torque Simulation UI**:
   - Removed the blur effect (`backdrop-blur-sm`) from the water element, allowing the patient submerged in water to be clearly visible without blurring.
   - Changed the main background gradient above the water from blue to a light gray/sky (`from-gray-100 to-sky-100`) so it vividly contrasts with the water line (`bg-blue-500/50`), making the water surface completely distinct.
3. **Simulation Reel Migration & Image Generation**:
   - Moved the `animation_metacentric_torque` simulation to the next reel (`b007`, the clinical case for hemiplegia and amputations) as requested.
   - Generated a sleek vector illustration showing the balance between the Center of Gravity (CG) and Center of Buoyancy (CB) using lines and dots.
   - Created a new component `CGCBBalanceImage.tsx` to render this image, bound it to the `image_cg_cb_balance` trigger, and assigned this trigger to the `b006` reel (the principle card) to replace the simulation there.

## Why it was done
The user asked for specific textual cleanups in the clinical data, as well as a more refined visual experience for the amputee simulation. Most importantly, the user wanted to decouple the physics principle (now explained via a generated structural image of CG/CB balance) from the clinical application (which now correctly houses the interactive simulation of the amputations).

## What needs to be checked
1. **Text Revisions**: Verify the clinical highlight in reel `b002` and the title in reel `b010` are updated.
2. **New CG/CB Image**: Verify reel `b006` displays the newly generated image showing the balance of CG and CB.
3. **Amputee Simulation Location and UI**: Check reel `b007` to ensure the interactive simulation is there. Look closely at the water – the blur should be gone, and the line between the air (light gray) and water (blue) should be crisp and obvious.
