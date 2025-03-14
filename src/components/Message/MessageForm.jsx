import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { Comment } from "./Comment";

export const MessageForm = ({ productId, onCommentAdded }) => {
    const { userData } = useContext(UserContext);
    const [newComment, setNewComment] = useState("");
    const [comments, setComments] = useState([]);
    const [error, setError] = useState(null);

    // Håndterer kommentarens afsendelse
    const handleSubmit = async (event) => {
        event.preventDefault(); // Forhindrer siden i at opdatere ved submit
        setError(null); // Resetter fejlmeddelelsen

        // Validering af input
        if (!newComment.trim()) {
            setError("Kommentarfeltet må ikke være tomt.");
            return;
        }

        if (!productId) {
            setError("Fejl: Produkt-ID mangler.");
            return;
        }

        if (!userData || !userData.access_token) {
            setError("Fejl: Du skal være logget ind for at kommentere.");
            return;
        }

        // Afsend kommentar til backend
        try {
            const response = await fetch(`http://localhost:4242/comment/${productId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userData.access_token}`,
                },
                body: JSON.stringify({ comment: newComment }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Kunne ikke sende kommentar");
            }

            console.log("✅ Kommentar sendt! Henter nye kommentarer...");
            setNewComment(""); // Tømmer inputfeltet efter afsendelse

            if (onCommentAdded) {
                onCommentAdded(); // Kald funktionen for at hente de nyeste kommentarer
            }
        } catch (err) {
            setError("Fejl ved afsendelse af kommentar: " + err.message);
            console.error(err);
        }
    };

    // Henter kommentarer for produktet
    useEffect(() => {
        const fetchList = async () => {
            try {
                const response = await fetch(`http://localhost:4242/comment/${productId}`);
                const result = await response.json();
                setComments(result); // Opdaterer kommentarerne i state
            } catch (err) {
                setError("Fejl ved at hente kommentarer: " + err.message);
                console.error(err);
            }
        };

        if (productId) {
            fetchList(); // Kun hent kommentarer hvis der er et produkt-ID
        }
    }, [productId]); // Effect kører når produktID ændres

    return (
        <>
            <form onSubmit={handleSubmit}>
                {error && <p className="text-danger">{error}</p>}
                <textarea
                    rows="3"
                    placeholder="Skriv en besked til sælger..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    required
                />
                <button type="submit">Send</button>
            </form>
            <Comment comment={comments} /> {/* Viser kommentarer */}
        </>
    );
};
