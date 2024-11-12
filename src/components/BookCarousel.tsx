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
import Modal from "react-modal"; // Import react-modal
import { fetchBookSummary } from "../services/openAIService"; // Import fetchBookSummary

export function BookCarousel({ books, addToList, isReadingList, removeFromList }) {
    const [selectedBook, setSelectedBook] = React.useState(null); // Track selected book for modal
    const [summary, setSummary] = React.useState(""); // Store fetched book summary
    const [isLoading, setIsLoading] = React.useState(false); // Track loading state

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
        // Open modal with book summary
        setSelectedBook(book);
        setIsLoading(true); // Set loading to true when starting to fetch
        const fetchedSummary = await fetchBookSummary(book.volumeInfo.title, book.volumeInfo.authors?.join(", ")); // Fetch the summary when the book is clicked
        setSummary(fetchedSummary);
        setIsLoading(false); // Set loading to false once fetching is complete
    };

    const closeModal = () => {
        setSelectedBook(null);
        setSummary(""); // Clear the summary when closing the modal
        setIsLoading(false); // Reset loading state
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
                                            onClick={() => handleBookClick(book)} // Book click handler
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
                                            {/* Conditionally render Add or Remove button */}
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

            {/* Book Summary Modal */}
            <Modal
                isOpen={!!selectedBook} // Modal is open if there's a selected book
                onRequestClose={closeModal} // Close modal on request
                contentLabel="Book Summary"
                ariaHideApp={false} // Disable app element for accessibility
            >
                <h2>{selectedBook?.volumeInfo.title}</h2>
                <p><strong>Summary:</strong> {isLoading ? "Loading summary..." : summary}</p>
                <button onClick={closeModal}>Close</button>
            </Modal>
        </div>
    );
}
