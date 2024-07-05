Convex Installation  
1.Install convex in the project.
2.Create schema.ts in convex folder in root of project.
3.Make sure to create the convext-client-provider file in the provider folder.
4.During development in order to test database,
run "bunx convex dev",
5.Check convex for for updates to your tables.

Liveblocks installation
In the terminal  
1. bun add @liveblocks/client
2. bun add @liveblocks/react
3. bunx create-liveblocks-app@latest --init --framework react
4. Add copy your api key to the liveblocks.config.ts

logic flow for the whiteboard functionality
canvas.tsx =>
-onPointerUp in <SVG> fires.
-In the hook onPointerUP, canvasState is checked for CanvasMode.inserting.
-If true canvasState.LayerType is changed to corresponding type, and point of click is saved.  
-InsertLayer hook is given the information and inserts a new layer(layerId,layer) that is stored in the useStorgae mutation from liveblocks
-These are added to liveLayerIds and LiveLayers(handled by liveblocks), setMyPresence is updated which is added to history(hooks useCanUndo, useCanRedo, useHistory are enabled)
-Finally setCanvasState is reset to mode:canvasMode.None(select item will automatically selected).

Selection net logic flow
canvas.tsx
<svg>
-onPointerDown sets the canvasState to pressing.
-onPointerMove checks if above is true.
-startMultiSelection method is fired.
-above method will check to see if there is click and drag that goes beyond a certain treshold to indicate user is selecting multiple items.
-any item with the selectionNet is added to the array of layerIds
