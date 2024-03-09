"use client";
import { useRef } from "react";

export function useSlideAnimation(
  initialHeight: number,
  options?: { duration?: number; delay?: number }
) {
  const targetRef = useRef<HTMLElement | null>(null);
  const setTarget = (element: HTMLElement | null) => {
    targetRef.current = element;
    if (element && element.style.height === "") {
      element.style.height = `${initialHeight}px`; // 초기 상태 설정
    }
  };
  let delayTimer: ReturnType<typeof setTimeout> | undefined;

  const toggle = (isForward?: boolean) => {
    const target = targetRef.current;
    if (!target) {
      return;
    }

    const forwardHeight = `${target.scrollHeight}px`;
    const backwardHeight = `${initialHeight}px`;
    const duration = options?.duration ? (options?.duration / 1000).toFixed(2) : 0.25;
    target.style.transition = `height ${duration}s ease-out`;

    // style.height가 상태를 저장하는 역할을 한다.
    if (isForward === undefined) {
      if (target.style.height === backwardHeight) {
        target.style.height = forwardHeight;
      } else {
        target.style.height = backwardHeight;
      }
    } else {
      target.style.height = isForward ? forwardHeight : backwardHeight;
    }

    // 애니메이션이 끝나면 transition을 제거한다.
    target.addEventListener("transitionend", () => {
      target.style.transition = "";
    });
  };

  const forward = () => {
    clearTimeout(delayTimer);
    delayTimer = setTimeout(() => {
      toggle(true);
    }, options?.delay ?? 0);
  };

  const backward = () => {
    clearTimeout(delayTimer);
    toggle(false);
  };

  return { forward, backward, toggle, targetRef, setTarget };
}
