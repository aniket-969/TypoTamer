import React, { useRef, useEffect } from 'react'

const MobileInput = ({ handleInput, mobileInput, mobileInputVisible, setMobileInputVisible, state, restart }) => {
    const inputRef = useRef(null);

    const handleClick = () => {
        if (state == "finish") {
            restart()

        }
        setMobileInputVisible(true);
        inputRef.current.focus();
    };
    const handleBlur = () => {
        setMobileInputVisible(false);
    };

    useEffect(() => {
        if (mobileInputVisible) {
            inputRef.current.focus();
            inputRef.current.setSelectionRange(inputRef.current.value.length, inputRef.current.value.length);
        }
    }, [mobileInputVisible]);

    useEffect(() => {
        if (state === "finish") {
            inputRef.current.blur();
        }
    }, [state]);

    const handleFocus = () => {
        inputRef.current.setSelectionRange(inputRef.current.value.length, inputRef.current.value.length);
      };

    return (
        <div className='sm:hidden visible'>
            <input type="text"
                ref={inputRef}
                onClick={handleClick}
                onBlur={handleBlur}
                onFocus={handleFocus}
                onChange={handleInput}
                value={mobileInput}
                placeholder='Click here to start...'
                className={mobileInputVisible ? 'hidden-input' : ''} />
        </div>
    )
}

export default MobileInput