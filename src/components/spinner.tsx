import React from "react";

function Spinner({
  height = 100,
  isFullScreen = false,
}: {
  height?: number;
  isFullScreen?: boolean;
}) {
  return (
    <div
      className="flex items-center justify-center"
      style={{
        height: isFullScreen ? "80vh" : `${height}px`,
      }}
    >
      <div className="w-10 h-10 border-8 border-solid border-t-gray-200 animate-spin rounded-full"></div>
    </div>
  );
}

export default Spinner;
