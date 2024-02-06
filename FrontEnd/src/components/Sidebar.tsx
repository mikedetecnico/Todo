import { useCallback, useEffect, useRef, useState } from "react";
import { useUser } from "../features/auth/useUser";
import IAuth from "../features/auth/IAuth";
import { useNavigate } from 'react-router-dom';
import CustomButton from "../widgets/CustomButton";
import ProfileMenu from "../widgets/ProfileMenu";
import { BsPlus } from "react-icons/bs";

interface SidebarProps {
  auth: IAuth;
  onOpenAddTaskModal: () => void;
}

const Sidebar = ({auth, onOpenAddTaskModal}: SidebarProps) => {
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
                  <ProfileMenu 
                    userDisplayName={user?.displayName} 
                    showProfileModal={openProfileModal} 
                    onProfileModal={handleProfileModal} 
                    onSignout={handleSignout}
                  />
                  <CustomButton buttonText='Add task' onClickCallback={onOpenAddTaskModal} Icon={BsPlus}/>
                </nav>
            </div>
            <div className="app-sidebar-resizer" onMouseDown={startResizing}/>
        </div>
    );
}

export default Sidebar;