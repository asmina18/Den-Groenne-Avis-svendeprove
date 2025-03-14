import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import style from "./style.module.scss";
import { FaLock } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";


export const LoginForm = ({ onSubmit, switchToSignup, isLoading }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ username: email, password });
    };

    return (
        <div className={style.formContainer}>
            <Form onSubmit={handleSubmit} className={style.form}>

                {/* Email input med ikon */}
                <Form.Group className={style.formGroup}>
                    <Form.Label>Email</Form.Label>
                    <div className={style.inputWrapper}>
                        <Form.Control
                            type="email"
                            placeholder="Din email..."
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <span className={style.inputIcon}>
                        <MdAlternateEmail />
                        </span>
                    </div>
                </Form.Group>

                {/* Password input med ikon */}
                <Form.Group className={style.formGroup}>
                    <Form.Label>Password</Form.Label>
                    <div className={style.inputWrapper}>
                        <Form.Control
                            type="password"
                            placeholder="Dit password..."
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <span className={style.inputIcon}>
                            <FaLock />
                        </span>
                    </div>
                </Form.Group>


                <Button type="submit" variant="success" className={style.submitButton} disabled={isLoading}>
                    {isLoading ? "Logger ind..." : "Login"}
                </Button>
            </Form>

            <p className={style.textCenter}>
                Har du ikke en konto? Klik  <span onClick={switchToSignup} className={style.link}>her</span>
            </p>
        </div>
    );
};
