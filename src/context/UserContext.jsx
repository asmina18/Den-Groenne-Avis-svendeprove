/**
 * 🔹 Komponent: UserContextProvider
 * - Håndterer brugerdata, som gemmes i sessionStorage.
 * - Når brugerdata er tilgængelige, gemmes de i sessionStorage.
 * - Når der ikke er nogen brugerdata, fjernes de fra sessionStorage.
 * - Giver `userData` og `setUserData` videre til komponenter, der bruger denne kontekst.
 * - Bruger semantiske JavaScript hooks (`useState`, `useEffect`) og holder koden ren og forståelig.
 */

import { createContext, useState, useEffect } from "react";

// 🔹 Opretter en UserContext, som kan bruges til at dele brugerdata globalt
export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    /**
     * 🔹 Funktion: Håndtering af brugerdata
     * - Henter brugerdata fra sessionStorage, hvis det er tilgængeligt.
     * - Hvis brugerdata findes, gemmes det i `userData`, ellers sættes det til `null`.
     */
    const [userData, setUserData] = useState(() => {
        const storedUser = sessionStorage.getItem("user");

        // 🔹 Log, når brugerdata hentes fra sessionStorage
        console.log("📥 Henter brugerdata fra sessionStorage:", storedUser);
        return storedUser ? JSON.parse(storedUser) : null; // Hvis der er data, parse det, ellers null
    });

    /**
     * 🔹 Effekt: Opdatering af sessionStorage
     * - Når `userData` ændres, gemmes det i sessionStorage.
     * - Hvis `userData` er null, fjernes data fra sessionStorage.
     */
    useEffect(() => {
        // 🔹 Hvis der er brugerdata, gem dem i sessionStorage
        if (userData) {
            sessionStorage.setItem("user", JSON.stringify(userData));
            console.log("✅ Brugerdata gemt i sessionStorage:", userData);
        } else {
            // 🔹 Hvis der ikke er brugerdata, fjern dem fra sessionStorage
            sessionStorage.removeItem("user");
            console.log("❌ Brugerdata fjernet fra sessionStorage");
        }
    }, [userData]); // 🔹 Effekt køres, når userData ændres

    /**
     * 🔹 Returnerer `UserContext.Provider`, der giver adgang til `userData` og `setUserData`
     * - `children` bruges til at vise de komponenter, der er indkapslet af denne provider.
     */
    return (
        <UserContext.Provider value={{ userData, setUserData }}>
            {children}
        </UserContext.Provider>
    );
};
