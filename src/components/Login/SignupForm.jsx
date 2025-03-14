import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import style from "./style.module.scss";
import { FaLock } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";

/**
 * 🔹 Komponent: SignupForm
 * - Lader brugeren oprette en konto med email, password og personlige oplysninger.
 * - Viser en loading-tekst, hvis `isLoading` er `true`.
 * - Har en knap til at skifte til login-formular.
 */
export const SignupForm = ({ onSubmit, switchToLogin, isLoading }) => {
    const [userData, setUserData] = useState({
        email: "",
        password: "",
        firstname: "",
        lastname: "",
        address: "",
        city: "",
        zipcode: "",
    });

    /**
     * 🔹 Opdaterer state, når brugeren skriver i inputfelterne.
     */
    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    /**
     * 🔹 Håndterer form-submission.
     * - Forhindrer, at brugeren sender tomme felter.
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        if (Object.values(userData).some(value => value.trim() === "")) return; // 🚨 Stopper, hvis felterne er tomme
        console.log("Data der sendes til serveren:", userData);
        onSubmit(userData);
    };

    return (
        <div className={style.formContainer}>
            <Form onSubmit={handleSubmit} className={style.form}>
                <fieldset>
                    <legend className="visually-hidden">Opret konto</legend>

                    {/* 🔹 Email input med ikon */}
                    <Form.Group className={style.formGroup}>
                        <Form.Label htmlFor="email">Email</Form.Label>
                        <div className={style.inputWrapper}>
                            <Form.Control
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Din email..."
                                value={userData.email}
                                onChange={handleChange}
                                required
                                aria-label="Indtast din email"
                            />
                            <span className={style.inputIcon}>
                                <MdAlternateEmail />
                            </span>
                        </div>
                    </Form.Group>

                    {/* 🔹 Password input med ikon */}
                    <Form.Group className={style.formGroup}>
                        <Form.Label htmlFor="password">Password</Form.Label>
                        <div className={style.inputWrapper}>
                            <Form.Control
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Dit password..."
                                value={userData.password}
                                onChange={handleChange}
                                required
                                aria-label="Indtast dit password"
                            />
                            <span className={style.inputIcon}>
                                <FaLock />
                            </span>
                        </div>
                    </Form.Group>

                    {/* 🔹 Brugeroplysninger */}
                    <Form.Group controlId="firstname">
                        <Form.Label>Fornavn</Form.Label>
                        <Form.Control
                            type="text"
                            name="firstname"
                            placeholder="Dit fornavn..."
                            value={userData.firstname}
                            onChange={handleChange}
                            required
                            aria-label="Indtast dit fornavn"
                        />
                    </Form.Group>

                    <Form.Group controlId="lastname">
                        <Form.Label>Efternavn</Form.Label>
                        <Form.Control
                            type="text"
                            name="lastname"
                            placeholder="Dit efternavn..."
                            value={userData.lastname}
                            onChange={handleChange}
                            required
                            aria-label="Indtast dit efternavn"
                        />
                    </Form.Group>

                    <Form.Group controlId="address">
                        <Form.Label>Adresse</Form.Label>
                        <Form.Control
                            type="text"
                            name="address"
                            placeholder="Din adresse..."
                            value={userData.address}
                            onChange={handleChange}
                            required
                            aria-label="Indtast din adresse"
                        />
                    </Form.Group>

                    <Form.Group controlId="city">
                        <Form.Label>By</Form.Label>
                        <Form.Control
                            type="text"
                            name="city"
                            placeholder="Din by..."
                            value={userData.city}
                            onChange={handleChange}
                            required
                            aria-label="Indtast din by"
                        />
                    </Form.Group>

                    <Form.Group controlId="zipcode">
                        <Form.Label>Postnummer</Form.Label>
                        <Form.Control
                            type="text"
                            name="zipcode"
                            placeholder="Dit postnummer..."
                            value={userData.zipcode}
                            onChange={handleChange}
                            required
                            aria-label="Indtast dit postnummer"
                        />
                    </Form.Group>

                    {/* 🔹 Opret konto knap */}
                    <Button
                        type="submit"
                        variant="success"
                        className={style.submitButton}
                        disabled={isLoading}
                    >
                        {isLoading ? "Opretter konto..." : "Opret konto"}
                    </Button>
                </fieldset>
            </Form>

            {/* 🔹 Link til at skifte til login */}
            <p className={style.textCenter}>
                Har du allerede en konto hos os? Klik
                <span onClick={switchToLogin} className={style.greenLink}> her </span>for at vende tilbage til login.
            </p>
        </div>
    );
};
