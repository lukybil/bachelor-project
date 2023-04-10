import { HTMLProps, useCallback, useEffect, useRef } from 'react';

interface ClickAwayListenerProps extends HTMLProps<HTMLDivElement> {
  onClickAway: () => void;
  listen: boolean;
}

const ClickAwayListener = ({
  children,
  onClickAway,
  listen = true,
}: ClickAwayListenerProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleClickAway = useCallback(
    (event: MouseEvent) => {
      if (
        ref.current &&
        event.target instanceof Node &&
        !ref.current.contains(event.target)
      ) {
        onClickAway();
      }
    },
    [onClickAway]
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
