export async function fetchBookSummary(bookTitle, bookAuthor) {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

    const messages = [
        { "role": "system", "content": "You are a helpful assistant." },
        { "role": "user", "content": `Provide a concise summary and key highlights for the book "${bookTitle}" by ${bookAuthor}.` }
    ];

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini", // or another suitable model
                messages: messages,
                temperature: 0.7
            })
        });

        const data = await response.json();
        return data.choices[0].message.content.trim();
    } catch (error) {
        console.error("Error fetching book summary:", error);
        return "Could not fetch summary.";
    }
}
