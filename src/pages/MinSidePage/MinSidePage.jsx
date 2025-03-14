import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Container } from "react-bootstrap";
import { MinKontoAnnonce } from "../../components/Anonce/MinKontoAnnonce";
import style from "./minSidePage.module.scss";

/**
 * Komponent: MinSidePage
 * Beskrivelse: Viser brugerens personlige side.
 * - Hvis brugeren ikke er logget ind, vises en besked.
 * - Viser brugerens navn og adgang til deres annoncer.
 */
export const MinSidePage = () => {
    const { userData } = useContext(UserContext);

    // 🚨 Hvis brugeren ikke er logget ind, vis en besked
    if (!userData?.user) {
        return <p className="text-danger">Du skal være logget ind for at se denne side.</p>;
    }

    return (
        <Container className={style.minSide}>
            <h1 className={style.titel}>Velkommen, {userData.user.firstname}!</h1>
            <p className={style.beskrivelse}>Her er din personlige side.</p>

            {/* 🔹 Indsætter MinKontoAnnonce (Brugerens annoncer) */}
            <MinKontoAnnonce />
        </Container>
    );
};
