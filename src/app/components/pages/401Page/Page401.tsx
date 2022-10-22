import { useNavigate } from "react-router-dom"

import Button from "../../common/Button"
import Container from "../../common/Container"
import Footer from "../../common/Footer";
import Header from "../../common/Header";


const Page401 = () => {
    const naviagte = useNavigate();

    return (
        <>
            <Header />
            <Container>
                <main className='main-page401'>
                    <h2 className='page401__title'>صفحه ی 401</h2>
                    <p>شما وارد نشده اید لطفا وارد شوید</p>
                    <Button
                        className='page401__button'
                        color="success"
                        style={{ borderRadius: 8 }}
                        onClick={() => { naviagte('/auth/signIn') }}
                    >
                        رفتن به صفحه ورود
                    </Button>
                </main>
            </Container>
            <Footer />
        </>
    )
}

export default Page401