"use client";

import { memo } from "react";
import { useOthersConnectionIds } from "@liveblocks/react/suspense";

const Cursors = () => {
  const ids = useOthersConnectionIds();
  return (
    <>
      {ids.map((connectionId) => (
        <Cursor key={connectionId} connectionId={connectionId} />
      ))}
    </>
  );
};

export const CursorsPresence = memo(() => {
  return (
    <>
      <p>!!!</p>;
    </>
  );
});

CursorsPresence.displayName = "CursorsPresence";
