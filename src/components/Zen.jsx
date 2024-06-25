
import { useState } from 'react';
import { useTypingContext } from '../context/TextProvider'

const Zen = () => {

    const {  toggleVisibility, keyEnable, setSelectedOptions } = useTypingContext()
    const [text, setText] = useState('');
    const [wordCount, setWordCount] = useState(0);

    const handleClick = () => {
        toggleVisibility('zen')
        keyEnable.current = true
        setSelectedOptions(prevOptions => ({
            ...prevOptions,
            zen: false,
        }));
    }
    const handleTextChange = (e) => {
        const inputText = e.target.value;
        setText(inputText);
        setWordCount(countWords(inputText));
    };

    const countWords = (str) => {
        return str.trim().split(/\s+/).filter(word => word.length > 0).length;
    };
    return (
        <div className='flex flex-col h-[85vh] gap-10 items-center'>
            <button onClick={handleClick} className=' utils-btn m-10'>Close</button>
            <textarea 
                placeholder='Click to start typing...' 
                className='by w-[90%] h-[50%] customarea resize-none p-2 text-2xl' 
                wrap="hard" 
                value={text}
                onChange={handleTextChange}
            />
            <div className='word-count'>
                Words typed: {wordCount}
            </div>
        </div>
    )
}

export default Zen