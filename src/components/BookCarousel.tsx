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

export function BookCarousel({ books, addToList, isReadingList, removeFromList }) {

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
                                        <CardContent className="flex flex-col items-center justify-center p-6">
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
        </div>
    );
}
