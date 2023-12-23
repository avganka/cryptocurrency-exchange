import { RefObject, useEffect } from 'react';

export const useSwitcherControl = (
  rootRef: RefObject<HTMLElement>,
  buttonRef: RefObject<HTMLElement>,
  opened: boolean,
  closeHandler: (event: MouseEvent) => void,
  openHandler: (event: MouseEvent) => void
) => {
  useEffect(() => {
    const listener = (evt: MouseEvent) => {
      if (
        evt.target instanceof Node &&
        opened &&
        rootRef.current &&
        evt.target &&
        !rootRef.current.contains(evt.target)
      ) {
        closeHandler(evt);
      }

      if (evt.target instanceof Node && buttonRef.current && buttonRef.current?.contains(evt.target)) {
        openHandler(evt);
      }
    };

    document.addEventListener('click', listener);

    return () => {
      document.removeEventListener('click', listener);
    };
  }, [opened]);
};
