import { Navigate } from 'react-router-dom';
import { auth } from '../routes/firebase';


// 이 컴포넌트는 로그인하지않고는 들어올수없는 컴포넌트를 보호하기 위해 만드는 컴포넌트

export default function ProtectedRoute({children} : {children : React.ReactNode}){
    //  로그인 되어있지 않은 상태
    if(auth.currentUser===null){
        return <Navigate to="/begin"/>
    }
    return children;
}