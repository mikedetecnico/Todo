import Sidebar from "../components/Sidebar";

const Home = () => {
    return (
        <div className='bg-primary flex flex-row min-h-screen h-screen'>
            <Sidebar />
            <div className='flex flex-col w-full h-screen bg-primary items-center content-center'>
                <h1 className='text-white'>Inbox</h1>
            </div>
        </div>
    );
}

export default Home;