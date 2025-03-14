import { useParams, Link } from "react-router-dom";
import { useGet } from "../../hooks/useGet";
import { FejlMeddelelse } from "../../components/Fælles/FejlMeddelse";
import { AsideKategorier } from "../../components/Fælles/AsideKategorier";
import style from "./KategoriPage.module.scss";
/**
 *   Komponent: KategoriPage
 * - Viser produkter fra en specifik kategori baseret på `kategoriSlug`.
 * - Henter data fra API'et og viser produkter i den valgte kategori.
 * - Viser en fejl- og loading-tilstand, hvis der opstår problemer med at hente data.
 * - Viser en besked, hvis der ikke er nogen produkter i kategorien.
 */
export function KategoriPage() {
    const { kategoriSlug } = useParams();
    const url = `http://localhost:4242/products/category/${kategoriSlug}`;
    const { data, isLoading, error } = useGet(url);

    //  Henter kategorinavnet fra API’et eller bruger slug’en som fallback
    // const categoryName = data?.message?.category || kategoriSlug.replace(/-/g, " ");
    // Produkter, der er hentet fra API'et
    const products = data?.data || [];

    return (
        <div className={`container ${style.kategoriPage}`}>
            <div className="row">
                {/* Sidebar med kategorier */}
                <aside className="col-md-3">
                    <AsideKategorier />
                </aside>

                {/* Hovedindhold med kategoriens produkter */}
                <section className="col-md-9">
                    {/* Viser kategorinavnet øverst
                    <header>
                        <h1 className="text-success">{categoryName}</h1>
                    </header> */}

                    <FejlMeddelelse error={error} isLoading={isLoading} />

                    {/* Viser en besked, hvis der ikke er nogen produkter */}
                    {products.length === 0 && !isLoading && !error && (
                        <p className={style.noProducts}>Ingen produkter fundet i denne kategori.</p>
                    )}

                    {/* Viser produktlisten */}
                    <div className={style.grid}>
                        {products.map((product) => (
                            <article key={product.id} className={style.productCard}>
                                <Link to={`/produkter/${product.slug}`}>
                                    <figure className={style.imageWrapper}>
                                        <img src={product.image} alt={product.name} className={style.productImage} />
                                        {product.price && <div className={style.priceTag}>Pris: {product.price} kr</div>}
                                    </figure>
                                </Link>

                                <p className={style.productName}>{product.name}</p>
                                <p className={style.productDescription}>{product.description}</p>
                            </article>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
