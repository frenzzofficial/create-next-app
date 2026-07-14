"use client";

import { useCallback, useMemo, useState } from "react";

type UseBooleanResult = {
  value: boolean;
  setTrue: () => void;
  setFalse: () => void;
  toggle: () => void;
  setValue: (value: boolean) => void;
};

/**
 * useBoolean.ts
 * --------------------------------------------------------------
 * Boolean state plus the three actions every "is this open/loading/
 * expanded" flag ends up needing — named handlers instead of writing
 * `setOpen((prev) => !prev)` inline at every call site.
 *
 *   const { value: isOpen, setTrue: open, setFalse: close, toggle } = useBoolean();
 *
 *   <Button onClick={open}>Open</Button>
 *   <Dialog open={isOpen} onClose={close} />
 */
export const useBoolean = (initialValue = false): UseBooleanResult => {
  const [value, setValue] = useState(initialValue);

  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  const toggle = useCallback(() => setValue((previous) => !previous), []);

  return useMemo(
    () => ({ value, setTrue, setFalse, toggle, setValue }),
    [value, setTrue, setFalse, toggle],
  );
};
