import { useCallback, useEffect, useRef, useState } from "react";
import { useUser } from "../auth/useUser";
import IAuth from "../auth/IAuth";
import { BsPersonCircle } from 'react-icons/bs';
import { BsChevronCompactDown } from "react-icons/bs";

interface SidebarProps {
  auth: IAuth;
}

const Sidebar = ({auth}: SidebarProps) => {
    const { user } = useUser(auth);
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
            <div className="app-sidebar-content" style={{width: sidebarWidth, minWidth: '230px'}} >
                <nav className='flex flex-col h-full'>
                  <div className='border-0 box-border list-none m-0 p-0'>
                    <div className='justify-between align-middle flex-row flex w-full'>
                      <button className='flex align-middle p-3 items-center'>
                        <BsPersonCircle className='text-4xl text-gray-500 m-3'/>
                        <h3 className='text-center'>{user?.displayName}</h3>
                        <BsChevronCompactDown className='m-2'/>
                      </button>
                    </div>
                  </div>
                </nav>
            </div>
            <div className="app-sidebar-resizer" onMouseDown={startResizing}/>
        </div>
    );
}

export default Sidebar;