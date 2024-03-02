import React from "react";

export const ProjectTitle = ({ onClick }: { onClick: () => void }) => {
  return (
    <span
      className="text-2xl font-bold cursor-pointer text-primary border-0 border-primary border-solid border-r p-5"
      onClick={onClick}
    >
      SHEY HOTELS
    </span>
  );
};
