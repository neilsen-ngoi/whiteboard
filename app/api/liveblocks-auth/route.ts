import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import { auth, currentUser } from "@clerk/nextjs/server";
import { stringify } from "querystring";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const liveblocks = new Liveblocks({
  secret:
    "sk_dev_4Sum163JfECGtmAwHEA8HYN-dueHQD7KTjcNB6HVIlyqi9d5xH-AxWPMnLImxby4",
});

export async function POST(request: Request) {
  // Get the current user from your database
  const authorization = await auth();
  const user = await currentUser();

  console.log("AUTH_INFO", {
    authorization,
    user,
  });

  if (!authorization || !user) {
    return new Response("Unauthorized", { status: 403 });
  }

  // Extract and get room id from convex
  const { room } = await request.json();
  const board = await convex.query(api.board.get, { id: room });

  console.log("AUTH_INFO", {
    room,
    board,
    boardOrgId: board?.orgId,
    userOrgId: authorization.orgId,
  });

  if (board?.orgId !== authorization.orgId) {
    return new Response("Unauthorized", { status: 403 });
  }
  const userInfo = {
    //TODO check if ! behind firstName is needed
    name: user.firstName!,
    picture: user.imageUrl,
  };

  console.log({ userInfo });

  // Start an auth session inside your endpoint
  const session = liveblocks.prepareSession(
    user.id,
    { userInfo } // Optional
  );

  if (room) {
    session.allow(room, session.FULL_ACCESS);
  }

  // Use a naming pattern to allow access to rooms with wildcards
  // Giving the user read access on their org, and write access on their group
  //   session.allow(`${user.organization}:*`, session.READ_ACCESS);
  //   session.allow(`${user.organization}:${user.group}:*`, session.FULL_ACCESS);

  // Authorize the user and return the result
  const { status, body } = await session.authorize();
  console.log({ status, body }, "ALLOWED");
  return new Response(body, { status });
}
