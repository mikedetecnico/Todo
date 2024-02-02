import { useCallback, useEffect, useRef, useState } from "react";
import { useUser } from "../features/auth/useUser";
import IAuth from "../features/auth/IAuth";
import { BsPersonCircle } from 'react-icons/bs';
import { BsChevronCompactDown } from "react-icons/bs";
import { BsPlus } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  auth: IAuth;
}

const Sidebar = ({auth}: SidebarProps) => {
    const { user } = useUser(auth);
    const sidebarRef = useRef<HTMLInputElement>(null);
    const [isResizing, setIsResizing] = useState<boolean>(false);
    const [sidebarWidth, setSidebarWidth] = useState<number>(268);
    const [openProfileModal, setOpenProfileModal] = useState<boolean>(false);

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

    const navigate = useNavigate();

    useEffect(() => {
        window.addEventListener("mousemove", resize);
        window.addEventListener("mouseup", stopResizing);
        return () => {
          window.removeEventListener("mousemove", resize);
          window.removeEventListener("mouseup", stopResizing);
        };
    }, [resize, stopResizing]);

    const handleProfileModal = () => {
      setOpenProfileModal(!openProfileModal);
    }

    const handleSignout = () => {
      auth.signOut().then(() => {
        navigate('/login');
      }).catch((error) => {
        console.log(error);
      });
    }
    
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
                      <button className='flex align-middle p-3 items-center hover:bg-hovergray' onClick={handleProfileModal}>
                        <BsPersonCircle className='text-4xl text-gray-500 m-3'/>
                        <h3 className='text-center'>{user?.displayName}</h3>
                        <BsChevronCompactDown className='m-2'/>
                        {
                          openProfileModal && <div className='absolute top-16 left-10 bg-navbar border-2 border-gray-300 rounded-md shadow-md z-40'>
                              <div className='flex flex-col'>
                                <button className='p-2 hover:bg-hovergray' onClick={handleSignout}>Logout</button>
                              </div>
                            </div>
                        }
                      </button>
                    </div>
                  </div>
                  <div className=''> 
                    <button className='text-primaryblue hover:bg-hovergray flex flex-row w-full m-2 p-2 items-center'>
                      <BsPlus className='text-2xl'/>
                      Add task
                    </button>
                  </div>
                </nav>
            </div>
            <div className="app-sidebar-resizer" onMouseDown={startResizing}/>
        </div>
    );
}

export default Sidebar;