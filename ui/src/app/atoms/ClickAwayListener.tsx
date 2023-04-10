import { HTMLProps, useCallback, useEffect, useRef } from 'react';

interface ClickAwayListenerProps extends HTMLProps<HTMLDivElement> {
  onClickAway: () => void;
  listen: boolean;
  consumeEvent?: boolean;
}

const ClickAwayListener = ({
  children,
  onClickAway,
  listen = true,
  consumeEvent = false,
}: ClickAwayListenerProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleClickAway = useCallback(
    (event: MouseEvent) => {
      if (
        ref.current &&
        event.target instanceof Node &&
        !ref.current.contains(event.target)
      ) {
        if (consumeEvent) {
          event.stopPropagation();
          event.preventDefault();
        }
        onClickAway();
      }
    },
    [onClickAway, consumeEvent]
  );

  useEffect(() => {
    if (window && listen) {
      window.addEventListener('click', handleClickAway, true);
    }
    return () => {
      if (window) window.removeEventListener('click', handleClickAway, true);
    };
  }, [handleClickAway, listen]);

  return <div ref={ref}>{children}</div>;
};

export default ClickAwayListener;
