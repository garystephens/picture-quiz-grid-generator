import { useEffect, useRef } from 'react';
import { addClassToElementTemporarily } from './utils.js';

// Allow access to previous state
function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

// If value changes, apply className to element identified by selector, and remove class after specified delay
function useTemporarilyHighlightChange(
    selector,
    className,
    delayBeforeRemovingClass,
    newValue
) {
    const prevValue = usePrevious(newValue);

    useEffect(() => {
        function valueHasChanged() {
            return prevValue !== undefined && newValue !== prevValue;
        }
        if (valueHasChanged()) {
            addClassToElementTemporarily(
                selector,
                className,
                delayBeforeRemovingClass
            );
        }
    });
}

export { usePrevious, useTemporarilyHighlightChange };
