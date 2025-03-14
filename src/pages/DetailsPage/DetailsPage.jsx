/**
 * 🔹 Komponent: DetailsPage
 * - Henter produktdetaljer baseret på `slug` fra URL'en.
 * - Viser produktinformationer som billede, navn, beskrivelse og pris.
 * - Viser en fejl- eller loading-tilstand, hvis der opstår problemer med API'et.
 * - Indeholder en beskedformular, hvor brugeren kan sende kommentarer til sælgeren.
 */
import { useParams } from "react-router-dom";
import { useGet } from "../../hooks/useGet";
import style from "./DetailsPage.module.scss";
import { MessageForm } from "../../components/Message/MessageForm";
import { AsideKategorier } from "../../components/Fælles/AsideKategorier";

export function DetailsPage() {
    // 🔹 Henter `slug` fra URL'en
    const { slug } = useParams();

    // 🔹 Henter produktdata ved hjælp af custom hook `useGet`
    const { data, isLoading, error } = useGet(`http://localhost:4242/products/${slug}`);

    // 🔹 Viser loading-tekst, hvis data er under hentning
    if (isLoading || !data || !data.data) return <p className={style.loading}>Indlæser produkt...</p>;

    // 🔹 Viser fejlbesked, hvis der opstod en fejl under hentning af produktdata
    if (error) return <p className={style.error}>Kunne ikke hente produktet.</p>;

    // 🔹 Produktdata
    const product = data.data;

    // 🔹 Log produktdata for debugging (kan fjernes senere)
    console.log("Hentet produkt:", product);

    return (
        <section className={style.detailsContainer}>
            {/* 🔹 Sidebar med kategorier */}
            <AsideKategorier />

            {/* 🔹 Produktdetaljer */}
            <div className={style.detailsPage}>
                <img className={style.image} src={product.image} alt={product.name} width="300" />
                <h3 className={style.title}>{product.name}</h3>
                <article>
                    <p className={style.description}>{product.description}</p>
                    <p className={style.price}>Pris: {product.price} kr.</p>
                </article>

                {/* 🔹 Formular til at sende beskeder til sælgeren */}
                <MessageForm productId={product.id} />
            </div>
        </section>
    );
}
