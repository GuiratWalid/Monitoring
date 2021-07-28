import { createContext } from 'react';

const modeContext = createContext({
    darkMode: false,
    setDarMode: () => { }
});

export { modeContext };