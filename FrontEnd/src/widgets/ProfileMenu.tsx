import { BsChevronCompactDown, BsPersonCircle } from "react-icons/bs";

interface ProfileMenuProps {
    userDisplayName: string | null | undefined;
    showProfileModal: boolean;
    onProfileModal: () => void;
    onSignout: () => void;
}

const ProfileMenu = ({userDisplayName, showProfileModal, onProfileModal, onSignout}: ProfileMenuProps) => {
    return (
        <div className='border-0 box-border list-none m-0 p-0'>
            <div className='justify-between align-middle flex-row flex w-full'>
                <button className='flex align-middle p-3 items-center hover:bg-hovergray' onClick={onProfileModal}>
                    <BsPersonCircle className='text-4xl text-gray-500 m-3'/>
                    <h3 className='text-center'>{userDisplayName}</h3>
                    <BsChevronCompactDown className='m-2'/>
                    {
                    showProfileModal && 
                        <div className='absolute top-16 left-10 bg-navbar border-2 border-gray-300 rounded-md shadow-md z-40'>
                        <div className='flex flex-col'>
                            <button className='p-2 hover:bg-hovergray' onClick={onSignout}>Logout</button>
                        </div>
                        </div>
                    }
                </button>
            </div>
        </div>
    )
}

export default ProfileMenu;