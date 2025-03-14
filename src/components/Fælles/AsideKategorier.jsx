import { useGet } from "../../hooks/useGet";
import { Link } from "react-router-dom";
import style from "./AsideKategorier.module.scss";

/**
 * 🔹 Komponent: AsideKategorier
 * - Viser en liste over alle produktkategorier.
 * - Bruges som en sidebar-menu i venstre side.
 * - Henter data fra API'et og viser en fejlbesked, hvis noget går galt.
 */
export function AsideKategorier() {
    // 📡 Henter kategorier fra API'et
    const { data, isLoading, error } = useGet("http://localhost:4242/categories");

    // 🏷 Hvis der ikke er data, sæt en tom liste
    const categories = data?.data || [];

    return (
        // ✅ <aside> er semantisk korrekt, da dette er en sidebar
        <aside className={style.aside} aria-labelledby="aside-kategorier">
            <h3 id="aside-kategorier" className="mb-1 text-dark">Alle kategorier</h3>

            {/* 🔹 Viser en besked, hvis data stadig indlæses */}
            {isLoading && <p className="text-muted">Indlæser...</p>}

            {/* 🔹 Viser en fejlbesked, hvis der opstår en fejl */}
            {error && <p className="text-danger">Fejl: {error}</p>}

            {/* 🔹 Viser listen med kategorier (kun hvis der er data) */}
            {categories.length > 0 && (
                <ul className="list-unstyled m-0 p-0">
                    {categories.map((category) => (
                        <li key={category.id} className={`py-1 ${style.categoryItem}`}>
                            <Link
                                to={`/produkter/kategori/${category.slug}`}
                                className={`text-decoration-none d-block px-2 ${style.categoryLink}`}
                            >
                                {category.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </aside>
    );
}
