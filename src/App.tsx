import React, {useEffect, useState} from 'react';
import { BookCarousel } from "@/components/BookCarousel";
import { SearchBar } from "@/components/SearchBar";
import { BookDrawer } from "@/components/BookDrawer";
import './app.css';

function App() {
    const [books, setBooks] = useState([]);

    const [selectedBooks, setSelectedBooks] = useState(() => {
        const savedBooks = localStorage.getItem('readingList');
        return savedBooks ? JSON.parse(savedBooks) : [];
    });

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

    return (
        <div>
            <h1>Next Book</h1>
            <SearchBar setBooks={setBooks} />
            <BookCarousel
                books={books}
                addToList={addToList}
                selectedBooks={selectedBooks}
                isReadingList={false} // Indicates that it's the search results
            />
            <BookDrawer
                selectedBooks={selectedBooks}
                removeFromList={removeFromList} // Pass remove function to the drawer
            />
        </div>
    );
}

export default App;