import { Outlet } from 'react-router-dom'
import './App.css'
import { ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useEffect, useState } from 'react'
import SummaryApi from './common'
import AppContext from './context'
import { useDispatch } from 'react-redux'
import { setUserDetails } from './store/userSlice'
import Header from './component/Header'





function App(){
    const dispatch = useDispatch()
    const [cartProductCount,setCartProductCount] = useState(0)
    
    const fetchUserDetails = async () => {
        try {
            const dataReponse = await fetch(SummaryApi.current_user.url, {
                method: SummaryApi.current_user.method,
            });
    
            const dataApi = await dataReponse.json();
    
            if (dataApi.success) {
                dispatch(setUserDetails(dataApi.data));
                console.log("long"); // Log "long" nếu fetch thành công
            }
        } catch (error) {
            console.error("Lỗi trong fetchUserDetails:", error);
        }
    }
    
    const fetchUserAddToCart = async () => {
        try {
            const dataResponse = await fetch(SummaryApi.addToCartProductCount.url, {
                method: SummaryApi.addToCartProductCount.method,
            });
    
            const dataApi = await dataResponse.json();
    
            setCartProductCount(dataApi?.data?.count);
            console.log("long"); // Log "long" nếu fetch thành công
        } catch (error) {
            console.error("Lỗi trong fetchUserAddToCart:", error);
        }
    }

    useEffect(()=>{
        fetchUserDetails()
        fetchUserAddToCart()
    },[])

    return(
        <div className=' '>
            <AppContext.Provider value={{
                fetchUserDetails,
                cartProductCount,
                fetchUserAddToCart
            }}>
                <Header/>
                <main className='min-h-[calc(100vh-96px)]'>
                <ToastContainer
                position='top-center' />
                    <Outlet/> 
                </main>
            </AppContext.Provider>
        </div>
    )
}

export default App