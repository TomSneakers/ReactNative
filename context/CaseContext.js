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
    const [scanned, setScanned] = useState(false);

    return (
        <Context.Provider value={{ myCase, setMyCase, scanned, setScanned }}>
            {children}
        </Context.Provider>
    );
}
