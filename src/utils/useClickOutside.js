import { useEffect } from "react";

const useClickOutside = (ref, eventHandler, isDisabled = false) => {
  useEffect(() => {
    if (isDisabled) {
      return;
    }

    let startedInside = false;
    let startedWhenMounted = false;

    const customListener = (event) => {
      if (startedInside || !startedWhenMounted) {
        return;
      }

      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      eventHandler(event);
    };

    const validateEventStart = (event) => {
      startedWhenMounted = ref.current;
      startedInside = ref.current && ref.current.contains(event.target);
    };

    document.addEventListener("mousedown", validateEventStart);
    document.addEventListener("touchstart", validateEventStart);
    document.addEventListener("click", customListener);

    return () => {
      document.removeEventListener("mousedown", validateEventStart);
      document.removeEventListener("touchstart", validateEventStart);
      document.removeEventListener("click", customListener);
    };
  }, [ref, eventHandler]);
};

export default useClickOutside;
