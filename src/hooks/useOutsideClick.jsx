import { useEffect } from "react";

export default function useOutSideClick(ref, cb) {
  useEffect(() => {
    const hanleOutsideClick = (evnet) => {
      if (ref.current && !ref.current.contains(evnet.target)) {
        cb();
      }
    };
    document.addEventListener("mousedown", hanleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", hanleOutsideClick);
    };
  }, [ref, cb]);
}
