"use client";

import { useEffect, useRef } from "react";

const FOCUSABLE_SELECTORS = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(", ");

function getVisibleFocusableElements(container: HTMLElement | null): HTMLElement[] {
  if (!container) return [];
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS)).filter(
    (el) => {
      const style = window.getComputedStyle(el);
      return style.display !== "none" && style.visibility !== "hidden";
    }
  );
}

/**
 * Focus trap hook for modal dialogs and overlays.
 * Traps focus within the container, restores focus to trigger on close.
 */
export function useFocusTrap({
  isOpen,
  containerRef,
  triggerRef,
  onClose,
}: {
  isOpen: boolean;
  containerRef: React.RefObject<HTMLElement | null>;
  triggerRef: React.RefObject<HTMLElement | null>;
  onClose?: () => void;
}) {
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const isClosingRef = useRef(false);

  // Focus trap and initial focus management
  useEffect(() => {
    if (!isOpen) return;

    isClosingRef.current = false;

    // Store the element that had focus before opening
    previousActiveElement.current = document.activeElement as HTMLElement;

    // Focus first focusable element in container
    requestAnimationFrame(() => {
      if (isClosingRef.current || !containerRef.current) return;
      const focusable = getVisibleFocusableElements(containerRef.current);
      if (focusable.length > 0) {
        focusable[0].focus({ preventScroll: true });
      }
    });

    // Handle keydown for focus trap
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        isClosingRef.current = true;
        onClose?.();
        return;
      }

      if (e.key !== "Tab" || !containerRef.current) return;

      const focusable = getVisibleFocusableElements(containerRef.current);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (e.shiftKey) {
        // Shift + Tab: going backwards
        if (active === first || !containerRef.current.contains(active)) {
          e.preventDefault();
          last.focus({ preventScroll: true });
        }
      } else {
        // Tab: going forwards
        if (active === last || !containerRef.current.contains(active)) {
          e.preventDefault();
          first.focus({ preventScroll: true });
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, containerRef, onClose]);

  // Restore focus to trigger on close
  useEffect(() => {
    if (isOpen) return;

    const timeoutId = window.setTimeout(() => {
      if (triggerRef.current) {
        triggerRef.current.focus({ preventScroll: true });
      } else if (
        previousActiveElement.current &&
        previousActiveElement.current !== document.body
      ) {
        previousActiveElement.current.focus({ preventScroll: true });
      }
    }, 100);

    return () => window.clearTimeout(timeoutId);
  }, [isOpen, triggerRef]);
}

/**
 * Hook for roving tabindex navigation (arrow keys) in menus/lists
 */
export function useRovingTabindex({
  isOpen,
  containerRef,
  itemsRef,
  orientation = "vertical",
  onSelect,
}: {
  isOpen: boolean;
  containerRef: React.RefObject<HTMLElement | null>;
  itemsRef: React.RefObject<(HTMLElement | null)[]>;
  orientation?: "vertical" | "horizontal";
  onSelect?: (index: number) => void;
}) {
  const currentIndex = useRef(0);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const items = itemsRef.current.filter(
        (el): el is HTMLElement =>
          el !== null &&
          window.getComputedStyle(el).display !== "none" &&
          window.getComputedStyle(el).visibility !== "hidden"
      );
      if (items.length === 0) return;

      let nextIndex = currentIndex.current;
      const isVertical = orientation === "vertical";

      if ((isVertical && e.key === "ArrowDown") || (!isVertical && e.key === "ArrowRight")) {
        e.preventDefault();
        nextIndex = (currentIndex.current + 1) % items.length;
      } else if ((isVertical && e.key === "ArrowUp") || (!isVertical && e.key === "ArrowLeft")) {
        e.preventDefault();
        nextIndex = (currentIndex.current - 1 + items.length) % items.length;
      } else if (e.key === "Home") {
        e.preventDefault();
        nextIndex = 0;
      } else if (e.key === "End") {
        e.preventDefault();
        nextIndex = items.length - 1;
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onSelect?.(currentIndex.current);
        return;
      } else if (e.key === "Escape") {
        return;
      } else {
        return;
      }

      currentIndex.current = nextIndex;

      requestAnimationFrame(() => {
        const targetItem = items[nextIndex];
        if (targetItem) {
          targetItem.focus({ preventScroll: true });
        }
      });
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, itemsRef, orientation, onSelect]);

  // Reset index when closed
  useEffect(() => {
    if (!isOpen) {
      currentIndex.current = 0;
    }
  }, [isOpen]);

  return currentIndex;
}
