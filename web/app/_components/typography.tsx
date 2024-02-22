import React from "react";

export function FormalHeader2(props: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`border-l-4 border-uos-blue font-medium text-lg pl-3 ${
        props.className ?? ""
      }`}
    >
      {props.children}
    </h2>
  );
}
