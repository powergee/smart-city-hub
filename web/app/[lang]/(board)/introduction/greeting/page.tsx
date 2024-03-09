"use client";
import { useState } from "react";

export default function GreetingPage() {
  const [state, setState] = useState(0);

  return (
    <div>
      Greeting! {state}{" "}
      <button
        onClick={() => {
          console.log(state);
          setState(state + 1);
          console.log(state);
        }}
      >
        click me
      </button>
    </div>
  );
}
