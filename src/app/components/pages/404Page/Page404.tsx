import { useNavigate } from "react-router-dom"

import Button from "../../common/Button"
import Container from "../../common/Container"
import Footer from "../../common/Footer";
import Header from "../../common/Header";


const Page404 = () => {
    const naviagte = useNavigate();

    return (
        <>
            <Header />
            <Container>
                <main className='main-page404'>
                    <h2 className='page404__title'>صفحه ی 404</h2>
                    <Button
                        className='page404__button'
                        color="success"
                        style={{ borderRadius: 8 }}
                        onClick={() => { naviagte('/') }}
                    >
                        رفتن به صفحه اصلی
                    </Button>
                </main>
            </Container>
            <Footer />
        </>
    )
}

export default Page404