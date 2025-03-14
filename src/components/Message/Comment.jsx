/**
 * 🔹 Komponent: Comment
 * - Viser en liste af kommentarer, hvis de findes.
 * - Viser en besked, hvis der ikke er nogen kommentarer.
 * - Gør brug af semantiske HTML-elementer for bedre struktur.
 * - Beskytter koden mod fejl, hvis `comment.data` ikke findes.
 */
export function Comment({ comment }) {
    // 🔸 Sikrer, at `comment.data` eksisterer og er et array
    if (!comment?.data || !Array.isArray(comment.data)) {
        return <p>Ingen kommentarer fundet</p>; // ✅ Viser besked i stedet for at crashe
    }

    return (
        <section aria-labelledby="comments-section">
            {/* 🔹 Overskrift for kommentarlisten */}
            <h3 id="comments-section">Kommentarer</h3>

            {/* 🔹 Hvis der er kommentarer, vis dem som en liste */}
            {comment.data.length > 0 ? (
                <ul aria-live="polite">
                    {comment.data.map((commentItem, index) => (
                        <li key={index}>{commentItem.comment}</li>
                    ))}
                </ul>
            ) : (
                <p>Ingen kommentarer fundet</p> // ✅ Viser besked, hvis der ikke er nogen kommentarer
            )}
        </section>
    );
}
