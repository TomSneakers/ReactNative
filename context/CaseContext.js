import { useState } from "react";
import { createContext } from "react";


export const Context = createContext({
    myCase: [],
    setMyCase: () => { }
})

// Composant
export default function CaseContext({ children }) {
    // remplacer ce hook par le hook useReducer
    const [myCase, setMyCase] = useState([]);

    return (
        <Context.Provider value={{ myCase, setMyCase }}>
            {children}
        </Context.Provider>
    );
}
