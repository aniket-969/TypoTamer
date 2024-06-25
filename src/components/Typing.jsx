import { useState, useEffect, useRef } from 'react';
import cn from 'classnames';
import Caret from './Caret';
import { useTypingContext } from '../context/TextProvider';
import { useUtilitiesContext } from '../context/UtilitiesProvider';

const Typing = ({ userInput, words, scrollRef, scroll, showOptions }) => {

    const [correctness, setCorrectness] = useState([]);
    const containerRef = useRef(null);
    const { caretPosition, setCaretPosition, selectedOptions, scrollFlag } = useTypingContext()
    const { fontSize, font, caret } = useUtilitiesContext()
    const scrollinRef = useRef(0)

    useEffect(() => {
        const newCorrectness = words.split('').map((char, index) => {
            if (userInput[index] == null) return null; // Not typed yet
            return userInput[index] === char;
        });
        setCorrectness(newCorrectness);

        if (containerRef.current) {
            const childNodes = containerRef.current.childNodes;
            if (childNodes.length > userInput.length) {
               
                const { offsetLeft, offsetTop, offsetHeight } = childNodes[userInput.length];
                
                setCaretPosition({ left: offsetLeft, top: offsetTop + offsetHeight });
            }

        }

        if (containerRef.current) {
            
           
            if (caret.current == 0) {
                caret.current = caretPosition.top
                
            }
            const scrollAtBottom = caretPosition.top - scrollinRef.current;
          
            if (scrollAtBottom === scroll) {
              
                scrollinRef.current += (scroll * 2)
                scrollRef.current.scrollTop += (scroll * 2)
            }
            else if (scrollAtBottom === -(scroll * 2)) {
                scrollRef.current.scrollTop -= (scroll * 2)
                scrollinRef.current -= (scroll * 2)
            }
        }
    }, [userInput, words, selectedOptions, showOptions]);

    useEffect(() => {
      
        scrollRef.current.scrollTop = 0
        scrollinRef.current = caretPosition.top + scroll
        caret.current = 0
    }, [words, fontSize, selectedOptions, showOptions, scrollFlag])

    return (
        <>
            <div ref={containerRef} className='absolute top-0 left-0 px-2 tracking-wider pb-2' style={{ fontFamily: font, color: "var(--sub-color)" }}>
                {words.split('').map((char, index) => (
                    <Character
                        key={index}
                        expected={char}
                        isCorrect={correctness[index]}
                    />
                ))}
            </div>

            <Caret position={caretPosition} />
        </>
    );
};

const Character = ({ expected, isCorrect }) => {
    const isWhiteSpace = expected === ' ';

    return (
        <span
            className={cn({
                'error': isCorrect === false && !isWhiteSpace,
                'correct': isCorrect === true && !isWhiteSpace,
                'space_error': isCorrect === false && isWhiteSpace,
                '': isCorrect === null
            })}
        >
            {expected}
        </span>
    );
};

export default Typing;
