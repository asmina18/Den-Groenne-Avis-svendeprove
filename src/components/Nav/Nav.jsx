import { FaEnvelope, FaInfoCircle, FaUser, FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";
import { UserContext } from "../../context/UserContext";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import style from "../Nav/Nav.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";

export const Nav = () => {
    const { userData, setUserData } = useContext(UserContext);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    // 🔹 Funktion til at logge brugeren ud
    const handleLogout = () => {
        setUserData(null);
        sessionStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <nav className={style.nav}>
            <div className={style.navContainer}>
                <h1
                    className={`${style.logo} ${menuOpen ? "fs-5" : "fs-5"}`}
                    onClick={() => navigate("/")}
                    style={{ cursor: "pointer" }}
                >
                    <span className={style.green}>Den Grønne</span>
                    <span className={style.border}>Avis</span>
                </h1>

                {/* 🔹 Burger-menu til mobil */}
                <button className={`navbar-toggler d-md-none ${style.burger}`} onClick={toggleMenu}>
                    {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>

                {/* 🔹 Desktop navigation */}
                <div className={`${style.navRight} d-none d-md-flex align-items-center gap-2`}>
                    <select className={style.categorySelect} style={{ fontSize: '0.9rem', padding: '6px' }}>
                        <option value="">Vælg kategori</option>
                        <option value="">Alle kategorier</option>
                        <option value="elektronik">Elektronik</option>
                        <option value="møbler">Møbler</option>
                        <option value="biler">Biler</option>
                    </select>

                    <button
                        className={style.createAdBtn}
                        style={{ fontSize: "0.9rem", padding: "6px 12px" }}
                        onClick={() => navigate("/opret-annonce")}
                    >
                        Opret annonce
                    </button>

                    <div className={`${style.icons} d-flex justify-content-center gap-2`}>
                        <FaEnvelope className={style.icon} size={20} />
                        <FaInfoCircle className={style.icon} size={20} />

                        {/* 🔹 Viser brugerens navn + logout-knap, hvis de er logget ind */}
                        {userData && userData.user ? (
                            <>
                                <span>Hej, {userData.user.firstname}</span>
                                <button onClick={handleLogout} className={style.logoutButton}>

                                    <FaSignOutAlt size={18} /> Logout
                                </button>
                            </>
                        ) : (
                            <FaUser className={style.icon} size={20} onClick={() => navigate("/login")} />
                        )}
                    </div>
                </div>
            </div>

            {/* 🔹 Mobil navigation */}
            {menuOpen && (
                <div className={`${style.navLinksMobile} d-md-none d-flex flex-column align-items-center gap-3 p-3`} style={{ minHeight: '10vh' }}>
                    <select className={style.categorySelect} style={{ width: '85%', fontSize: '1rem', padding: '8px' }}>
                        <option value="">Vælg kategori</option>
                        <option value="">Alle kategorier</option>
                        <option value="elektronik">Elektronik</option>
                        <option value="møbler">Møbler</option>
                        <option value="biler">Biler</option>
                    </select>

                    <button
                        className={style.createAdBtn}
                        style={{ fontSize: "0.9rem", padding: "6px 12px" }}
                        onClick={() => navigate("/opret-annonce")}
                    >
                        Opret annonce
                    </button>

                    <div className={`${style.icons} d-flex justify-content-center gap-3`}>
                        <FaEnvelope className={style.icon} size={20} />
                        <FaInfoCircle className={style.icon} size={20} />

                        {/* 🔹 Samme login/logout-logik for mobil */}
                        {userData && userData.user ? (
                            <>
                                <span>Hej, {userData.user.firstname}</span>
                                <button onClick={handleLogout} className={style.logoutButton}>

                                    <FaSignOutAlt size={18} /> Logout
                                </button>
                            </>
                        ) : (
                            <FaUser className={style.icon} size={20} onClick={() => navigate("/login")} />
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};
