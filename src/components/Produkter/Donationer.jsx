import style from "./Donationer.module.scss";
import image1 from "../../assets/banner_image2.jpg";
import image2 from "../../assets/banner_image3.jpg";

export function Donationer() {
    return (
        <section className={style.donationer}>
            {/* Box container for at holde de to donationer */}
            <div className={style.boxContainer}>

                {/* Første donation boks */}
                <article className={style.box}>
                    {/* Billede til donationen */}
                    <img src={image1} alt="Banner for Donationer til Dato" />
                    <div className={style.textContent}>
                        <header>
                            <h2>Donationer til Dato</h2>
                            <h5>Sammen med dig har vi siden starten indsamlet:</h5>
                        </header>
                        <p>452.231,50 kr</p>
                        <p>Tak fordi du handler brugt, med omtanke for klimaet.</p>
                    </div>
                </article>

                {/* Anden donation boks */}
                <article className={style.box}>
                    {/* Billede til donationen */}
                    <img src={image2} alt="Banner for Donationer i år" />
                    <div className={style.textContent}>
                        <header>
                            <h2>Donationer i år</h2>
                            <h5>Sammen med dig har vi i år indsamlet:</h5>
                        </header>
                        <p>112.452,75 kr</p>
                        <p>Tak fordi du handler brugt, med omtanke for jorden.</p>
                    </div>
                </article>
            </div>
        </section>
    );
}
