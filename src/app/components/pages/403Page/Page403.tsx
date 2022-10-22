import { useNavigate } from "react-router-dom"

import Button from "../../common/Button"
import Container from "../../common/Container"
import Footer from "../../common/Footer";
import Header from "../../common/Header";


const Page403 = () => {
    const naviagte = useNavigate();

    return (
        <>
            <Header />
            <Container>
                <main className='main-page403'>
                    <h2 className='page403__title'>صفحه ی 403</h2>
                    <p>شما دسترسی لازم را ندارید</p>
                    <Button
                        className='page403__button'
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

export default Page403