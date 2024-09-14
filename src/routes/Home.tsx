import { useNavigate } from 'react-router-dom';
import { auth } from './firebase'

export default function Home(){
    const navigate= useNavigate();

    function handleLogout(){
        //  로그아웃 
        auth.signOut();
        navigate('/login');
    }
    return    <button onClick={handleLogout}>Log out</button>
}
