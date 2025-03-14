import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { Container } from "react-bootstrap";
import styles from "./minKontoAnnonce.module.scss"


// MinKontoAnnonce.js → Viser og håndterer brugerens annoncer
// Henter og viser alle brugerens annoncer
// Brugeren kan fjerne en annonce (DELETE request)

/**
 * Komponent: MinKontoAnnonce
 * Beskrivelse: Viser en liste over brugerens annoncer og giver mulighed for at fjerne dem.
 */
export const MinKontoAnnonce = () => {
    const { userData } = useContext(UserContext);
    const [annoncer, setAnnoncer] = useState([]);
    const [error, setError] = useState(null);

    /**
     * 🔹 Funktion til at slette en annonce
     * - Sender en DELETE-request til API'et
     * - Opdaterer UI ved at fjerne annoncen fra listen
     */
    const handleDeleteAnnonce = async (annonceId) => {
        if (!userData?.access_token) return; // Stop, hvis brugeren ikke er logget ind

        try {
            const response = await fetch(`http://localhost:4242/products/${annonceId}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${userData.access_token}` },
            });

            if (!response.ok) throw new Error("Kunne ikke slette annonce");

            //  Fjern den slettede annonce fra state uden at reloade siden
            setAnnoncer((prevAnnoncer) => prevAnnoncer.filter((annonce) => annonce.id !== annonceId));

            console.log(` Annonce ${annonceId} fjernet`);
        } catch (err) {
            console.error("❌ Fejl ved sletning:", err);
        }
    };

    /**
     * - Henter brugerens annoncer fra backend
     * - Sender en GET-request til API'et
     * - Gemmer annoncer i state, så de kan vises i UI'et
     */
    useEffect(() => {
        if (!userData?.access_token) return; // Stop, hvis brugeren ikke er logget ind

        const fetchAnnoncer = async () => {
            try {
                const response = await fetch(`http://localhost:4242/products?user_id=${userData.user.id}`, {
                    headers: { Authorization: `Bearer ${userData.access_token}` },
                });

                if (!response.ok) throw new Error("Kunne ikke hente annoncer");

                const data = await response.json();

                console.log("📡 Hentede annoncer fra server:", data);
                setAnnoncer(data.data); // Gemmer annoncer i state
            } catch (err) {
                setError(err.message);
            }
        };

        fetchAnnoncer();
    }, [userData]); // Kører kun, når `userData` ændrer sig

    return (
        <Container className={styles.mineAnnoncer}>
            <h2 className={styles.titel}>Dine Annoncer</h2>
            {/* 🔹 Viser en fejlbesked, hvis der opstår en fejl */}
            {error && <p className="text-danger">{error}</p>}
            {/* 🔹 Sektion til liste af annoncer */}
            <section className={styles.liste}>
                {annoncer.length > 0 ? (
                    annoncer.map((annonce) => (
                        <article key={annonce.id} className={styles.annonce}>
                            <h3 className={styles.navn}>{annonce.name}</h3>
                            <p className={styles.beskrivelse}>{annonce.description}</p>
                            <p className={styles.pris}><strong>Pris:</strong> {annonce.price} kr</p>
                            <img src={annonce.image} alt={annonce.name} className={styles.billede} />

                            <div className={styles.knapper}>
                                <button className={styles.sletKnap} onClick={() => handleDeleteAnnonce(annonce.id)}>
                                    Fjern annonce
                                </button>
                            </div>
                        </article>
                    ))
                ) : (
                    <p className={styles.ingen}>Du har ingen annoncer endnu.</p>
                )}
            </section>
        </Container>

    )
}

