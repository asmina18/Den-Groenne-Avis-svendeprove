import style from "./MissionBanner.module.scss";
import image from '../../assets/avis.png';

export function MissionBanner() {
    return (
        <section className={style.bannerWrapper}>
            {/* Banner sektion der indeholder billede og tekst */}
            <div className={style.banner}>
                {/* Billede for banneret */}
                <img src={image} alt="Den Grønne Avis logo" className={style.bannerImage} />

                {/* Hovedoverskrift for missionen */}
                <h2>Den Grønne Avis</h2>

                {/* Beskrivende tekst om missionen */}
                <p className={style.missionsP}>
                    Vi går forrest i kampen om klimaet ved at give 2 kr. til klima-venlige formål, hver gang du handler brugt. Den Grønne Avis
                </p>
            </div>
        </section>
    );
}
