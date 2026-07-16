import { useCallback, useEffect } from "react";

export const DROPDOWN_CLOSE_DELAY_MS = 200;

type UseHoverDropdownProps = {
  id: string;
  onChange: (groupId: string, activeId: string | null) => void;
};

const dropdownTimers = new Map<string, ReturnType<typeof setTimeout>>();

export const useHoverDropdown = ({ id, onChange }: UseHoverDropdownProps) => {
  const clearTimer = useCallback(() => {
    const timer = dropdownTimers.get(id);

    if (!timer) return;

    clearTimeout(timer);
    dropdownTimers.delete(id);
  }, [id]);

  const handleEnter = useCallback(
    (activeId: string) => {
      clearTimer();
      onChange(id, activeId);
    },
    [clearTimer, id, onChange],
  );

  const handleLeave = useCallback(() => {
    clearTimer();

    const timer = setTimeout(() => {
      onChange(id, null);
      dropdownTimers.delete(id);
    }, DROPDOWN_CLOSE_DELAY_MS);

    dropdownTimers.set(id, timer);
  }, [clearTimer, id, onChange]);

  useEffect(() => {
    return () => {
      clearTimer();
    };
  }, [clearTimer]);

  return {
    handleEnter,
    handleLeave,
  };
};
