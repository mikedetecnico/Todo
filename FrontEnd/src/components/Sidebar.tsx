import { useCallback, useEffect, useRef, useState } from "react";

const Sidebar = () => {
    const sidebarRef = useRef<HTMLInputElement>(null);
    const [isResizing, setIsResizing] = useState<boolean>(false);
    const [sidebarWidth, setSidebarWidth] = useState<number>(268);

    const startResizing = useCallback(() => {
        setIsResizing(true);
      }, []);

    const stopResizing = useCallback(() => {
    setIsResizing(false);
    }, []);

    const resize = useCallback(
        (mouseMoveEvent: MouseEvent) => {
          if (isResizing && sidebarRef.current) {
            setSidebarWidth(
              mouseMoveEvent.clientX -
                sidebarRef.current.getBoundingClientRect().left
            );
          }
        },
        [isResizing]
    );

    useEffect(() => {
        window.addEventListener("mousemove", resize);
        window.addEventListener("mouseup", stopResizing);
        return () => {
          window.removeEventListener("mousemove", resize);
          window.removeEventListener("mouseup", stopResizing);
        };
    }, [resize, stopResizing]);
    
    return (
        <div 
            className="app-sidebar" 
            ref={sidebarRef} 
            style={{ width: sidebarWidth }} 
            onMouseDown={(e) => e.preventDefault()}
        >
            <div className="app-sidebar-content" />
            <div className="app-sidebar-resizer" onMouseDown={startResizing}/>
        </div>
    );
}

export default Sidebar;