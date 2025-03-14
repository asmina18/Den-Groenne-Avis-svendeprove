/**
 * 🔹 Komponent: UdvalgteKategorier
 * - Henter og viser 6 tilfældige kategorier fra API'et.
 * - Viser en loading- og fejlbesked, hvis der er problemer med at hente kategorierne.
 * - Hver kategori vises med et billede og et link til den relevante kategori.
 * - Bruger semantiske HTML-elementer og holder koden ren og forståelig.
 */
import { useGet } from "../../hooks/useGet";
import { Link } from "react-router-dom";
import { FejlMeddelelse } from "../Fælles/FejlMeddelse";
import style from "./UdvalgteKategorie.module.scss";

export function UdvalgteKategorier() {
    // 🔹 Henter kategorierne fra API'et
    const { data, isLoading, error } = useGet("http://localhost:4242/categories");

    // 🔹 Sikrer, at vi altid har et array, ellers bruger vi en tom array
    const categories = Array.isArray(data?.data) ? data.data : [];

    // 🔹 Vælger 6 tilfældige kategorier fra listen
    const randomCategories = [...categories]
        .sort(() => Math.random() - 0.5) // Blander kategorierne tilfældigt
        .slice(0, 6); // Vælger de første 6

    return (
        <section className={style.categories}>
            {/* 🔹 Grøn linje som i designet */}
            <div className={style.line}></div>

            {/* 🔹 Overskrift til sektionen */}
            <h3 className={style.title}>Populære Kategorier</h3>

            {/* 🔹 Viser fejl- eller indlæsningsbesked hvis nødvendigt */}
            <FejlMeddelelse error={error} isLoading={isLoading} />

            {/* 🔹 Viser kategorier, hvis der er nogen tilgængelige */}
            {randomCategories.length > 0 ? (
                <div className={style.grid}>
                    {randomCategories.map((category) => (
                        <Link
                            key={category.id}
                            to={`/produkter/kategori/${category.slug}`}
                            className={style.categoryCard}
                        >
                            {/* 🔹 Billede og navn for hver kategori */}
                            <div className={style.imageWrapper}>
                                <img
                                    src={category.category_image}
                                    alt={category.name} // Beskrivelse af billedet
                                    className={style.categoryImage}
                                />
                                <div className={style.categoryName}>{category.name}</div>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                // 🔹 Hvis der ikke er kategorier, vis besked
                <p>Ingen kategorier tilgængelige.</p>
            )}
        </section>
    );
}
