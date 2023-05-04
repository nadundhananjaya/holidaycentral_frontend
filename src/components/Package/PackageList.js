import react, {useEffect, useState} from "react";
import NavigationBar from "../NavigationBar/NavigationBar";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const PackageList = () => {

    const [packageList, setPackageList] = useState([])

    const [destination, setDestination] = useState("Singapore");
    const [duration, setDuration] = useState(5)
    const [maxNumberOfTravelers, setMaxNumberOfTravelers] = useState(5)

    const loadPackageList = async () => {
        const response = await fetch('http://localhost:8080/package/list', {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify({
                "destination": destination,
                "duration": duration,
                "maxNumberOfTravelers": maxNumberOfTravelers
            })
        });
        const data = await response.json();
        setPackageList(data)
        console.log({
            "destination": destination,
            "duration": parseInt(duration),
            "maxNumberOfTravelers": parseInt(maxNumberOfTravelers)
        })
    }

    const addCart = (newCartObject) => {
        const cartItems = localStorage.getItem("cart_items")

        if (cartItems === null) {
            const newItem = [newCartObject]
            localStorage.setItem("cart_items", JSON.stringify(newItem));
            toast("Successfully added to cart !");
        } else {
            const cartArray = JSON.parse(cartItems)
            const hasNewItem = cartArray.some(obj => obj._id === newCartObject._id);

            if (hasNewItem === true) {
                toast("Already Added to the Cart !");
                console.log("Already added !!!")
            } else {

                const newItems = JSON.stringify([...cartArray, newCartObject])
                localStorage.setItem("cart_items", newItems);
                toast("Successfully added to cart !");
            }
        }
    }


    const destinationChangeHandler = (event) => {
        setDestination(event.target.value)
    }
    const durationChangeHandler = (event) => {
        setDuration(event.target.value)
    }
    const numberOfTravelersHandler = (event) => {
        setMaxNumberOfTravelers(event.target.value)
    }

    useEffect(() => {
        loadPackageList()
    }, [duration, destination, maxNumberOfTravelers]);

    return <>
        <NavigationBar/>

        <div className={`card mt-5 ring`}>
            <div className={`card-body`}>
                <div className={`row`}>


                    <div className={`col-12 col-lg-4 mb-3`}>
                        <label htmlFor="exampleInputPassword1" className="form-label">Destination</label>

                        <select
                            name="classType"
                            id="classType"
                            className="form-select dropdown"
                            value={destination}
                            onChange={destinationChangeHandler}
                        >
                            <option value="Maldives">Maldives</option>
                            <option value="Sri Lanka">Sri Lanka</option>
                            <option value="Singapore">Singapore</option>
                        </select>
                    </div>

                    <div className={`col-12 col-lg-4 mb-3`}>
                        <label htmlFor="exampleInputPassword1" className="form-label">Duration</label>

                        <select
                            name="classType"
                            id="classType"
                            className="form-select dropdown"
                            value={duration}
                            onChange={durationChangeHandler}
                        >
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="5">5</option>
                        </select>
                    </div>

                    <div className={`col-12 col-lg-4 mb-3`}>
                        <label htmlFor="exampleInputPassword1" className="form-label">Number of Travellers</label>

                        <select
                            name="classType"
                            id="classType"
                            className="form-select dropdown"
                            value={maxNumberOfTravelers}
                            onChange={numberOfTravelersHandler}
                        >
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                    </div>


                    <div className={`col-12 mt-3`}>
                        <div className="d-grid gap-2">
                            <button type="submit" className="btn btn-dark">Package Search</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className={`mt-5`}>
            <div className={`row g-3`}>
                {packageList.map((packages, index) => {

                        return <div key={index} className={` col-12 col-lg-6`}>
                            <div className={`card m-1`}>
                                <div className="card-body">
                                    <h5 className="card-title mb-4">{packages.packageName}</h5>
                                    <p>Duration : {packages.duration}</p>

                                    <p>Destination : {packages.destination}</p>

                                    <p>
                                        Package Starting from (per Person) : <strong>Rs.{packages.pricePerPerson}</strong>
                                    </p>

                                    <p>Speciality : {packages.speciality}</p>


                                    <button onClick={() => addCart(packages)} className="btn btn-dark float-end mt-4">Add to
                                        Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    }
                )}
            </div>
        </div>

        <ToastContainer/>
    </>
}
export default PackageList
