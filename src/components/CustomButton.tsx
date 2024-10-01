import { Button } from "@/components/ui/button";
import * as React from "react";

const CustomButton = ({ variant = "outline", onClick, children }) => {
    return (
        <Button variant={variant} onClick={onClick}>
            {children}
        </Button>
    );
};

export default CustomButton;