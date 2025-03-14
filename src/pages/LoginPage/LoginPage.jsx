import { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { LoginForm } from "../../components/Login/LoginForm";
import { SignupForm } from "../../components/Login/SignupForm";
import { FejlMeddelelse } from "../../components/Fælles/FejlMeddelse";
import style from "../../components/Login/style.module.scss";

/**
 * 🔹 Komponent: LoginPage
 * - Håndterer login og signup formularer på login-siden.
 * - Skifter mellem login og signup formularer baseret på tilstand (isSignup).
 * - Viser fejlmeddelelser og loading state under login/signup processerne.
 * - Bruger semantiske HTML-elementer og holder koden ren og forståelig.
 */
export const LoginPage = () => {
    // Bruges til at navigere til andre sider
    const navigate = useNavigate();
    const { setUserData } = useContext(UserContext);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSignup, setIsSignup] = useState(false);

    // Skifter mellem login- og signup-form
    const toggleSignupMode = () => setIsSignup(!isSignup);

    // 🔹 Funktion til at logge brugeren ind
    const handleLogin = async ({ username, password }) => {
        setIsLoading(true);
        setError(null);

        console.log("🔹 Sender login-data:", { username, password });

        // Opretter et objekt med login-oplysninger
        const body = new URLSearchParams();
        body.append("username", username);
        body.append("password", password);

        const options = {
            method: "POST",
            body: body, // Sender data i form-urlencoded format
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
        };

        try {
            // Sender login-data til serveren
            const response = await fetch("http://localhost:4242/login", options);
            if (!response.ok) throw new Error("Ugyldigt login");

            // Henter svar fra serveren
            const data = await response.json();
            console.log("📡 Login response:", data);

            // Hvis login lykkes, gem brugerens oplysninger
            if (data.data && data.data.access_token) {
                const userObject = {
                    access_token: data.data.access_token,
                    user: data.data.user,
                };

                setUserData(userObject);
                sessionStorage.setItem("user", JSON.stringify(userObject));

                //  Viser en alert-besked
                // alert(`Velkommen, ${data.data.user.firstname}! Du er nu logget ind.`);

                // Sender brugeren til "Min side"
                navigate("/min-side");
            } else {
                setError("Fejl ved login, prøv igen.");
            }
        } catch (err) {
            setError(err.message);
            console.log(" Server returnerede fejl:", err.message);
        } finally {
            setIsLoading(false);
        }
    };

    // 🔹 Funktion til at oprette en ny bruger
    const handleSignup = async (userData) => {
        setIsLoading(true);
        setError(null);

        console.log("📡 Sender signup-data:", userData);

        // Opretter et objekt med brugerens data
        const body = new URLSearchParams();
        body.append("email", userData.email);
        body.append("password", userData.password);
        body.append("firstname", userData.firstname);
        body.append("lastname", userData.lastname);
        body.append("address", userData.address);
        body.append("city", userData.city);
        body.append("zipcode", userData.zipcode);


        const options = {
            method: "POST",
            body: body,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        };
        try {
            // Sender signup-data til serveren
            const response = await fetch("http://localhost:4242/users", options);
            if (!response.ok) throw new Error("Kunne ikke oprette bruger");

            // Henter svar fra serveren
            const data = await response.json();
            console.log(" Signup response:", data);

            // Når en ny bruger er oprettet, logges de automatisk ind
            await handleLogin({ username: userData.email, password: userData.password });
        } catch (err) {
            setError(err.message);
            console.log("❌ Server returnerede fejl:", err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container className={style.loginPage}>
            <div className={style.formWrapper}>
                <h2 className={style.formTitle}>
                    {isSignup ? "Opret en konto" : "Velkommen tilbage"}
                </h2>

                <FejlMeddelelse error={error} isLoading={isLoading} />
                {/* Det er en ternary operator (kort if-else), som fungerer sådan:
                    Hvis isSignup er true, vis <SignupForm /> (opret konto-form).
                    Hvis isSignup er false, vis <LoginForm /> (login-form).
                */}
                {isSignup ? (
                    <SignupForm onSubmit={handleSignup} switchToLogin={toggleSignupMode} isLoading={isLoading} />
                ) : (
                    <LoginForm onSubmit={handleLogin} switchToSignup={toggleSignupMode} isLoading={isLoading} />
                )}
            </div>
        </Container>
    );
};
