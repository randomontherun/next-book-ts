import { useState } from 'react';
import { Input } from "@/components/ui/input";
import CustomButton from "@/components/CustomButton";
import * as process from "node:process";

export function SearchBar({ setBooks }) {
    const [query, setQuery] = useState("");

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSearch = async () => {
        if (!query) return;

        const API_KEY = process.env.GOOGLE_API_KEY;
        const API_URL = `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${API_KEY}`;
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            setBooks(data.items || []);
        } catch (error) {
            console.error("Error fetching books: ", error);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch(); // Call the search function when Enter is pressed
        }
    };

    return (
        <div className="flex justify-center">
            <div className="flex items-center"
                 style={{maxWidth: '500px', width: '100%'}}>
                <Input
                    type="text"
                    placeholder="Search for books..."
                    value={query}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    className="mr-2 flex-grow"
                />
                <CustomButton onClick={handleSearch}>Search</CustomButton>
            </div>
        </div>
    );
}