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