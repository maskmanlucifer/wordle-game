import { useState } from "react";

const useWordle = (solution) => {
    const [turn, setTurn] = useState(0);
    const [currentGuess, setCurrentGuess] = useState('');
    const [guesses, setGuesses] = useState([...Array(6)]); // Each guess is an array
    const [history, setHistory] = useState([]); // Each guess is an string
    const [isCorrect, setIsCorrect] = useState(false);
    const [usedKeys, setUsedKeys] = useState({}); // {a: 'green', b: 'yellow'}

    // Format a new guess when a user submits a word
    // e.g. [{key: 'a', color: 'yellow'}]
    const formatGuess = () => {
        console.log("formatting the guess - " + currentGuess);
        const solutionArray = [...solution];
        const formattedGuess = [...currentGuess].map((letter)=>{
            return {
                key : letter,
                color : 'grey'
            }
        });
        
        // Find any green colors 
        formattedGuess.forEach((object, index)=>{
            if(solutionArray[index] === object.key) {
                formattedGuess[index].color = 'green';
                solutionArray[index] = null;
            }
        })

        // Find any yellow colors
        formattedGuess.forEach((object, index)=>{
            if(solutionArray.includes(object.key) && object.color !== 'green') {
                formattedGuess[index].color = 'yellow';
                solutionArray[solutionArray.indexOf(object.key)] = null;
            }
        })

        return formattedGuess;
    };

    // Add a new guess to the guesses state
    // update the incorrect state if the guess is correct
    // add one to the turn state
    const addNewGuess = (formatted) => {
        if(currentGuess === solution) {
            setIsCorrect(true);
        }
        setGuesses((prev)=>{
            let newGuesses = [...prev];
            newGuesses[turn] = formatted;
            return newGuesses;
        })
        setHistory((prev)=>{
            return [...prev, currentGuess];
        })
        setTurn((prev)=>{
            return prev + 1;
        })
        setUsedKeys((prevUsedKeys)=>{
            let newKeys = {...prevUsedKeys};
            formatted.forEach((letter)=>{
                let currentColor = newKeys[letter.key];
                if(letter.color === 'green') {
                    newKeys[letter.key] = 'green';
                    return;
                }
                if(letter.color === 'yellow' && currentColor !== 'green') {
                    newKeys[letter.key] = 'yellow';
                    return;
                }
                if(letter.color === 'grey' && currentColor !== 'green' && currentColor !== 'yellow') {
                    newKeys[letter.key] = 'grey';
                    return;
                }
            })
            return newKeys;
        })
        setCurrentGuess('');
    };

    // Handle keyup event & track current guess
    // if user presses enter , add the new guess
    const handleKeyup = ({key}) => {
        if(key === 'Enter') {
            // Only add guess if turn is less than five
            if(turn > 5 ) {
                console.log("you used all your guesses");
                return;
            }
            // Do not allow duplicate words
            if(history.includes(currentGuess)) {
                console.log("you already tried that word");
                return;
            }
            // Check if the word is 5 chars long
            if(currentGuess.length !== 5) {
                console.log("word must be 5 chars long");
                return;
            }
            const formatted = formatGuess();
            addNewGuess(formatted);
        }
        if(key === 'Backspace') {
            setCurrentGuess((prev)=>{
                return prev.slice(0,-1);
            })
        }
        if(/^[A-Za-z]$/.test(key)) {
            if(currentGuess.length < 5) {
                setCurrentGuess((prev) => {
                    return prev + key;
                })
            }
        }
    };

    return {turn, currentGuess, guesses, isCorrect, handleKeyup, usedKeys};
};

export default useWordle;