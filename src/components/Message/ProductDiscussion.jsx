// import { useState, useEffect, useContext } from "react";
// import { UserContext } from "../../context/UserContext";
// import { MessageForm } from "./MessageForm";

// export const ProductDiscussion = ({ productId }) => {
//     const { userData } = useContext(UserContext);
//     const [comments, setComments] = useState([]);
//     const [error, setError] = useState(null);

//     console.log("ProductDiscussion modtager productId:", productId);

//     // 🔹 Funktion til at hente kommentarer fra API
//     const fetchComments = async () => {
//         try {
//             console.log("🔄 Henter kommentarer fra API for produkt-ID:", productId);
//             const response = await fetch(`http://localhost:4242/comment/${productId}`);
//             if (!response.ok) throw new Error("Kunne ikke hente kommentarer.");

//             const data = await response.json();
//             console.log("✅ Opdaterede kommentarer:", data.data);
//             setComments(data.data || []);
//         } catch (err) {
//             setError("Fejl ved hentning af kommentarer: " + err.message);
//             console.error(err);
//         }
//     };

//     // 🔹 Hent kommentarer, når komponenten loader første gang
//     useEffect(() => {
//         fetchComments();
//     }, [productId]);

//     return (
//         <section>
//             <h3>Kommentarer</h3>

//             {/* Formular til at tilføje en ny kommentar */}
//             {userData ? (
//                 <MessageForm productId={productId} onCommentAdded={fetchComments} />
//             ) : (
//                 <p>Du skal være logget ind for at skrive en kommentar.</p>
//             )}

//             {/* Fejlbesked hvis der er en fejl */}
//             {error && <p className="text-danger">{error}</p>}

//             {/* Hvis der ikke er kommentarer, vis en besked */}
//             {comments.length === 0 ? (
//                 <p>Der er endnu ingen kommentarer. Vær den første til at skrive en!</p>
//             ) : (
//                 comments.map((comment) => (
//                     <div key={comment.id}>
//                         <p>
//                             <strong>{comment.user.firstname}</strong>: {comment.comment}
//                         </p>
//                     </div>
//                 ))
//             )}
//         </section>
//     );
// };
