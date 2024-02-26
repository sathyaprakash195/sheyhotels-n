import React from "react";

function PageTitle({ title }: { title: string }) {
  return <h1 className="text-2xl text-primary font-bold">{title}</h1>;
}

export default PageTitle;
