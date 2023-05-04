import react, {useEffect, useState} from 'react'

const NavigationBar = () => {

    const cartItems = localStorage.getItem("cart_items")

    const [cartItemCount,setCartItemCount]  = useState(0)

    const readCartItemCount = () => {

        if (cartItems !== null) {
            const cartArray = JSON.parse(cartItems)
            setCartItemCount(cartArray.length)
        }
    }
    useEffect(() => {
        readCartItemCount()
    },[cartItems])

    return <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item m-lg-2">
                        <a className="nav-link active" aria-current="page" href="/hotel">Hotel</a>
                    </li>
                    <li className="nav-item m-lg-2">
                        <a className="nav-link" href="/flight">Flight</a>
                    </li>
                    <li className="nav-item m-lg-2">
                        <a className="nav-link" href="/package">Package</a>
                    </li>

                </ul>
                <div>
                    <a href={`/cart`} className={`btn btn-dark`}>
                        Cart {cartItemCount}
                    </a>
                </div>

            </div>
        </div>
    </nav>
}

export default NavigationBar
