import { useEffect, useState, useRef } from "react";

export function useHeaderAndNavDimensions() {
    const [headerHeight, setHeaderHeight] = useState(0);
    const [navWidth, setNavWidth] = useState(0);
    const headerRef = useRef(null);
    const navRef = useRef(null);

    const handleResize = () => {
        if (headerRef.current) {
            setHeaderHeight(headerRef.current.offsetHeight);
        }
        if (navRef.current) {
            setNavWidth(navRef.current.offsetWidth);
        }
    };

    useEffect(() => {
        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return {
        contentStyle: {
            marginTop: `${headerHeight}px`,
            marginLeft: `${navWidth}px`,
            right: `0`,
            maxWidth: `${1920}px`,
            height: `100%`,
            zIndex: `999`,
            display: `flex`,
            flexWrap: 'wrap',
            // overflowX: `hidden`
        },
        headerRef,
        navRef,
    };
}
