import { useEffect, useState } from "react";

const TAILWIND_LG_SIZE = 1024


export default function useIsMobile() {

    const [isMobile, setIsMobile] = useState(window.innerWidth <= TAILWIND_LG_SIZE);
    
    useEffect(() => {
        const handleResize = () => {
            console.log(window.innerWidth)
            setIsMobile(window.innerWidth <= TAILWIND_LG_SIZE);
        };
        
        window.addEventListener('resize', handleResize);
        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
 return isMobile   
}