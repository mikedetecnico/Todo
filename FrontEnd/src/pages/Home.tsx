import Sidebar from "../components/Sidebar";
import Api, { Todo } from "../api/api";
import { useEffect, useState } from "react";
import IAuth from "../auth/IAuth";

interface HomeProps {
    auth: IAuth;
}

const Home = ({auth}: HomeProps) => {
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        Api.getTodos('test').then((res) => {
            console.log(res);
            setTodos(res);
        }
        ).catch((err) => {
            console.log(err);
        });
    }, [])

    return (
        <div className='bg-primary flex flex-row min-h-screen h-screen'>
            <Sidebar auth={auth}/>
            <div className='flex flex-col w-full h-screen bg-primary items-center content-center'>
                <h1 className='text-white'>Inbox</h1>
                <div className='flex flex-col w-1/2 h-1/2 bg-white rounded-md'>
                    {todos.map((todo) => {
                        return (
                            <div className='flex flex-row w-full h-1/6 bg-white'>
                                <div className='flex flex-col w-1/6 h-full bg-white'>
                                    <label>Complete?</label>
                                    <input type='checkbox' placeholder='Complete'/>
                                </div>
                                <div className='flex flex-col w-5/6 h-full bg-white'>
                                    <h1>{todo.task}</h1>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Home;