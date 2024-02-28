import React from "react";

export function FormalHeader2(props: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <h2
      className={`border-l-4 border-uos-blue font-medium text-lg pl-3 ${
        props.className ?? ""
      }`}
      style={props.style}
    >
      {props.children}
    </h2>
  );
}
