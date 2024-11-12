import React, { useEffect, useState } from 'react';
import { BookCarousel } from "@/components/BookCarousel";
import { SearchBar } from "@/components/SearchBar";
import { BookDrawer } from "@/components/BookDrawer";
import Modal from "react-modal"; // Import Modal for displaying summaries
import { fetchBookSummary } from "@/services/openAIService"; // Import fetchBookSummary function
import './app.css';

function App() {
    const [books, setBooks] = useState([]);
    const [selectedBooks, setSelectedBooks] = useState(() => {
        const savedBooks = localStorage.getItem('readingList');
        return savedBooks ? JSON.parse(savedBooks) : [];
    });
    const [selectedBook, setSelectedBook] = useState(null);
    const [summary, setSummary] = useState("");

    useEffect(() => {
        localStorage.setItem('readingList', JSON.stringify(selectedBooks));
    }, [selectedBooks]);

    const addToList = (book) => {
        if (!selectedBooks.some((selected) => selected.id === book.id)) {
            setSelectedBooks((prevSelectedBooks) => [...prevSelectedBooks, book]);
        }
    };

    const removeFromList = (bookId) => {
        setSelectedBooks((prevSelectedBooks) =>
            prevSelectedBooks.filter((book) => book.id !== bookId)
        );
    };

    const handleBookClick = async (book) => {
        setSelectedBook(book);
        const fetchedSummary = await fetchBookSummary(book.volumeInfo.title, book.volumeInfo.authors?.join(", "));
        setSummary(fetchedSummary);
    };

    const closeModal = () => {
        setSelectedBook(null);
        setSummary("");
    };

    return (
        <div className="app-container">
            <h1 className="app-title">Next Book</h1>
            <SearchBar setBooks={setBooks} />
            <BookCarousel
                books={books}
                addToList={addToList}
                selectedBooks={selectedBooks}
                isReadingList={false} // Indicates that it's the search results
            />
            <BookDrawer
                selectedBooks={selectedBooks}
                removeFromList={removeFromList}
                onBookClick={handleBookClick} // Pass handleBookClick to open summary
            />

            {/* Modal to display the book summary */}
            <Modal isOpen={!!selectedBook} onRequestClose={closeModal}>
                <h2>{selectedBook?.volumeInfo.title}</h2>
                <p><strong>Summary:</strong> {summary || "Loading summary..."}</p>
                <button onClick={closeModal}>Close</button>
            </Modal>
        </div>
    );
}

export default App;