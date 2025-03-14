import style from "./KategoriKort.module.scss";

/**
 * 🔹 Komponent: KategoriKort
 * - Viser en kategori som et kort med titel.
 * - Bruges til at præsentere en kategori på en overskuelig måde.
 */
export function KategoriKort({ category }) {
    // Hvis der ikke er en kategori, vis ingenting
    if (!category?.name) return null;

    return (

        <article className={style.card} aria-label={`Kategori: ${category.name}`}>
            <header>
                <h4>{category.name}</h4>
            </header>
        </article>
    );
}
