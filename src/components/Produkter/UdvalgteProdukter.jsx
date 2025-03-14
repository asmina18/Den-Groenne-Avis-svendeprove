/**
 * 🔹 Komponent: UdvalgteProdukter
 * - Henter og viser 6 tilfældige produkter fra API'et.
 * - Viser en loading- og fejlbesked, hvis der er problemer med at hente produkterne.
 * - Hvert produkt vises i et kort, som kan klikkes på for at se detaljer.
 * - Bruger semantiske HTML-elementer og holder koden ren og forståelig.
 */
import { useGet } from "../../hooks/useGet";
import { Link } from "react-router-dom";
import { FejlMeddelelse } from "../Fælles/FejlMeddelse";
import { ProduktKort } from "../Fælles/ProduktKort";
import style from "./UdvalgteProdukter.module.scss";

export function UdvalgteProdukter() {
    // 🔹 Henter produkterne fra API'et
    const { data, isLoading, error } = useGet("http://localhost:4242/products");

    // 🔹 Hvis data ikke er tilgængelige, sætter vi en tom array
    const products = data?.data || [];

    // 🔹 Hvis products ikke er et array, vis fejl
    if (!Array.isArray(products)) {
        console.error("FEJL: `products` er ikke en array!", products);
        return null; // Returnerer ingenting hvis der er en fejl
    }

    // 🔹 Vælger 6 tilfældige produkter fra listen
    const randomProducts = [...products].sort(() => 0.5 - Math.random()).slice(0, 6);

    return (
        <>
            <section className={style.products}>
                {/* 🔹 Viser fejl- eller indlæsningsbesked hvis nødvendigt */}
                <FejlMeddelelse error={error} isLoading={isLoading} />

                {/* 🔹 Viser besked, hvis der ikke er produkter */}
                {products.length === 0 && !isLoading && <p>Ingen produkter fundet</p>}

                {/* 🔹 Divider linje */}
                <div className={style.line}></div>

                {/* 🔹 Overskrift for sektionen */}
                <h3 className={style.title}>Udvalgte Produkter</h3>

                {/* 🔹 Produktgrid, vis tilfældige produkter */}
                <div className={style.grid}>
                    {randomProducts.map((product) => (
                        <div key={product.id} className={style.card}>
                            {/* 🔹 Hver produktlink fører til produktsiden */}
                            <Link to={`/produkter/${product.slug}`}>
                                <ProduktKort product={product} /> {/* Viser produktkortet */}
                            </Link>
                        </div>
                    ))}
                </div>

                {/* 🔹 Divider linje */}
                <div className={style.line}></div>
            </section>
        </>
    );
}
