import React from 'react';
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { BookCarousel } from "@/components/BookCarousel";
import { Button } from "@/components/ui/button"; // Assuming you're using the Button component

export function BookDrawer({ selectedBooks, removeFromList }) {
    return (
        <Drawer>
            <DrawerTrigger asChild>
                {/* Use the Button component with the desired style */}
                <Button variant="outline">Open Reading List</Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Reading List</DrawerTitle>
                </DrawerHeader>
                {/* Pass the selected books to the BookCarousel and enable isReadingList */}
                <BookCarousel
                    books={selectedBooks}
                    isReadingList={true} // Indicate it's the reading list
                    removeFromList={removeFromList} // Remove functionality for the reading list
                />
            </DrawerContent>
        </Drawer>
    );
}