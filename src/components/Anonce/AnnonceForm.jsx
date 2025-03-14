import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../Anonce/AnnonceForm.module.scss";
import { UserContext } from "../../context/UserContext";

/**
 * Komponent: AnnonceForm
 * Beskrivelse: Giver brugeren mulighed for at oprette en ny annonce.
 * - Sender data til API (POST request)
 * - Kræver, at brugeren er logget ind
 * - Viser fejlbeskeder, hvis noget går galt
 */
export const AnnonceForm = () => {
    const { userData } = useContext(UserContext);
    const navigate = useNavigate();

    // State til formularfelterne
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        description: "",
        imageUrl: "",
        price: "",
    });

    // State til fejl- og succesbeskeder
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    /**
     * 🔹 Opdaterer state, når brugeren skriver i inputfelterne
     */
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    /**
     * 🔹 Håndterer form-submit og sender data til API
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        //  Tjek om brugeren er logget ind
        if (!userData || !userData.access_token) {
            setError("Fejl: Du skal være logget ind for at oprette en annonce.");
            return;
        }

        // 🔹 Payload til API
        const payload = {
            name: formData.title,
            description: formData.description,
            image: formData.imageUrl,
            price: Number(formData.price),
            category_id: Number(formData.category),
            user_id: userData.user.id, // 🆔 Sørger for at sende user_id
        };

        try {
                /**
     * 🔹 Sender en POST-request til API'et for at oprette en ny annonce.
     * - URL: http://localhost:4242/products (endpoint til at oprette annoncer)
     * - Metode: "POST" (opretter en ny ressource)
     * - Headers:
     *   - "Content-Type": "application/json" (fortæller API'et, at vi sender JSON-data)
     *   - "Authorization": `Bearer ${userData.access_token}` (inkluderer brugerens token for at sikre, at kun autoriserede brugere kan oprette annoncer)
     * - Body: JSON-objekt (`payload`) med annonce-data (titel, beskrivelse, pris osv.)
     */
            const response = await fetch("http://localhost:4242/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userData.access_token}`,
                },
                // konverterer objekt til JSON
                body: JSON.stringify(payload),
            });
            /**
             * 🔹 Tjekker om API'et har accepteret requesten.
             * - Hvis `response.ok` er `false`, betyder det, at der opstod en fejl.
             * - Vi forsøger at hente fejlbeskeden fra API'et og kaster en fejlmeddelelse.
             */
            if (!response.ok) {
                const errorData = await response.json();// 🔹 Henter fejlbesked fra serveren
                throw new Error(errorData.message || "Kunne ikke oprette annonce.");// 🔹 Hvis API'et sender en fejl, vises den her
            }

            console.log("✅ Annonce oprettet:", await response.json());
            setSuccess("Annonce oprettet med succes!");

            // 🔄 Nulstil formular
            setFormData({ title: "", category: "", description: "", imageUrl: "", price: "" });

            // 🚀 Naviger brugeren til "Mine Annoncer"
            navigate("/mine-annoncer");

        } catch (err) {
            setError("Fejl ved oprettelse af annonce: " + err.message);
            console.error(err);
        }
    };

    return (
        <section className={styles.annonceForm}>
            <h1>Opret ny annonce</h1>
            <p className={styles.subtext}>
                Her kan du oprette en ny annonce.<br />
                Du har mulighed for at slette dine annoncer igen.
            </p>

            {/* 🔹 Viser fejl- eller succesbesked */}
            {error && <p className="text-danger">{error}</p>}
            {success && <p className="text-success">{success}</p>}

            {/* 🔹 Formular til oprettelse af annonce */}
            <form className={styles.form} onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Annonce detaljer</legend>

                    <label htmlFor="title">Titel</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Titel på dit produkt..."
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="category">Kategori</label>
                    <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Vælg kategori</option>
                        <option value="1">Kategori 1</option>
                        <option value="2">Kategori 2</option>
                    </select>

                    <label htmlFor="description">Annonce tekst</label>
                    <textarea
                        id="description"
                        name="description"
                        placeholder="Beskrivelse af produktet..."
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="imageUrl">Billede URL</label>
                    <input
                        type="text"
                        id="imageUrl"
                        name="imageUrl"
                        placeholder="Indsæt billede URL her..."
                        value={formData.imageUrl}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="price">Pris</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        placeholder="Pris..."
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                </fieldset>

                {/* 🔹 Knap til at indsende formularen */}
                <div className={styles.buttonContainer}>
                    <button type="submit">Opret annonce</button>
                </div>
            </form>
        </section>
    );
};
