import { useEffect, useRef } from 'react';

// Allow access to previous state
function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

export { usePrevious };
