import {  useState } from 'react'



const useInput = (validate) => {

    
    const [input, setInput] = useState('');
    const [isTouched, setIsTouched] = useState(false);

    const isValid = validate(input);
    const hasError = !isValid && isTouched;


    const touchedHandler = () => {
        setIsTouched(true);
    }

    const inputHandler = (e) => {
        setInput(e.target.value);
        console.log(e.target.value)
    }
    const reset = () => {
        setInput('');
        setIsTouched(false)
    }

    return {
        value: input, isValid,hasError,touchedHandler,inputHandler,reset
    }

}
export default useInput;