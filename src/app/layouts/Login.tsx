import { useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom'
import Footer from '../components/common/Footer';
import Header from '../components/common/Header';
import SignInPage from '../components/pages/SignInPage';
import SignUpPage from '../components/pages/SignUpPage';
import { getIsLoggedIn } from '../store/users';

const Login = () => {
    const { type } = useParams<{ type: string }>();
    const isLoggedIn = useSelector(getIsLoggedIn());

    return (
        <>
            {isLoggedIn && (<Navigate to="/" replace={true} />)}
            <Header />
            {type === 'signUp' ? <SignUpPage /> : <SignInPage />}
            <Footer />
        </>
    )
}

export default Login