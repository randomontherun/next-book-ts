import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import CustomButton from "@/components/CustomButton";
import Modal from "react-modal";
import { fetchBookSummary } from "../services/openAIService";
import ReactMarkdown from 'react-markdown';

// Custom styles for the Modal
const customStyles = {
    content: {
        zIndex: 1000,
    },
    overlay: {
        zIndex: 999, // Ensure the overlay is beneath the modal but above the drawer overlay
        backgroundColor: 'rgba(0, 0, 0, 0.5)' // Adjust the opacity for better readability
    }
};

export function BookCarousel({ books, addToList, isReadingList, removeFromList }) {
    const [selectedBook, setSelectedBook] = React.useState(null);
    const [summary, setSummary] = React.useState("");

    const handleActionButton = (book) => {
        if (isReadingList) {
            return (
                <CustomButton onClick={() => removeFromList(book.id)} className="mt-2">
                    Remove
                </CustomButton>
            );
        } else {
            return (
                <CustomButton onClick={() => addToList(book)} className="mt-2">
                    Add
                </CustomButton>
            );
        }
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
        <div className="flex justify-center">
            <Carousel className="w-full max-w-4xl">
                <CarouselContent>
                    {books.length === 0 ? (
                        <CarouselItem>
                            <div className="p-1">
                                <Card>
                                    <CardContent className="flex aspect-square items-center justify-center p-6">
                                        <span className="text-xl font-semibold">No results found</span>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ) : (
                        books.map((book) => (
                            <CarouselItem key={book.id} className="md:basis-1/2 lg:basis-1/3">
                                <div className="p-1">
                                    <Card>
                                        <CardContent
                                            className="flex flex-col items-center justify-center p-6"
                                            onClick={() => handleBookClick(book)}
                                        >
                                            <img
                                                className="mb-2 w-24 h-32 object-cover"
                                                src={book.volumeInfo.imageLinks?.thumbnail}
                                                alt={book.volumeInfo.title}
                                            />
                                            <span className="text-lg font-semibold">{book.volumeInfo.title}</span>
                                            <span className="text-sm text-gray-600">
                                                {book.volumeInfo.authors?.join(", ") || "Unknown Author"}
                                            </span>
                                            {handleActionButton(book)}
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))
                    )}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>

            <Modal
                isOpen={!!selectedBook}
                onRequestClose={closeModal}
                contentLabel="Book Summary"
                ariaHideApp={false}
                style={customStyles} // Apply custom styles
            >
                <h2>{selectedBook?.volumeInfo.title}</h2>
                <div>
                    <ReactMarkdown>{summary || "Loading summary..."}</ReactMarkdown>
                </div>
                <CustomButton onClick={closeModal}>Close</CustomButton>
            </Modal>
        </div>
    );
}
