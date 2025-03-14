import style from "./ProduktKort.module.scss";

/**
 * 🔹 Komponent: ProduktKort
 * - Viser et produkt med billede og navn.
 * - Bruges til at vise produkter i en liste/grid.
 */
export function ProduktKort({ product }) {
    if (!product?.name) return null; // 🚨 Hvis produkt mangler data, vises ingenting

    return (

        <article className={style.card} aria-label={`Produkt: ${product.name}`}>
            {/* 🔹 Sikrer, at billedet altid har en alt-tekst */}
            <img
                src={product.image || "https://via.placeholder.com/150"}
                alt={product.name || "Billede ikke tilgængeligt"}
            />

            <div className={style.overlay}>
                <header>
                    <h4>{product.name}</h4>
                </header>

                {/* <p>{product.price} DKK</p> */}
            </div>
        </article>
    );
}
