import react, {useEffect, useState} from "react";
import NavigationBar from "../NavigationBar/NavigationBar";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const getCurrentDate = () => {
    const inputDate = new Date().toLocaleDateString();
    const parts = inputDate.split('/');
    const year = parts[2];
    const month = parts[1].padStart(2, '0');
    const day = parts[0].padStart(2, '0');
    const formatedDate = `${year}-${month}-${day}`;
    return formatedDate
}

const getDayAfterWeek = () => {
    const inputDate = new Date().setDate(new Date().getDate() + 7);
    const newDate = new Date(inputDate).toLocaleDateString()
    const parts = newDate.split('/');
    const year = parts[2];
    const month = parts[1].padStart(2, '0');
    const day = parts[0].padStart(2, '0');
    const formatedDate = `${year}-${month}-${day}`;
    console.log(formatedDate)
    return formatedDate
}
const FlightList = () => {


    const [flightList, setFlightList] = useState([])

    const [departureAirport, setDepartureAirport] = useState('Sri Lanka');
    const [arrivalAirport, setArrivalAirport] = useState('Dubai');
    const [departureTime, setDepartureTime] = useState(getCurrentDate());
    const [arrivalTime, setArrivalTime] = useState(getDayAfterWeek())
    const [cabinClass, setCabinClass] = useState('Economy')

    const loadFlightList = async () => {
        const response = await fetch('http://localhost:8080/flight/list', {
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
                "departureAirport": departureAirport,
                "departureTime": departureTime,
                "arrivalAirport": arrivalAirport,
                "arrivalTime": arrivalTime,
                "cabinClass": cabinClass
            })
        });
        const data = await response.json();
        setFlightList(data)
    }

    const arrivalAirportChangeHandler = (event) => {
        setArrivalAirport(event.target.value)
    }

    const departureAirportChangeHandler = (event) => {
        setDepartureAirport(event.target.value)
    }

    const cabinClassChangeHandler = (event) => {
        setCabinClass(event.target.value)
    }

    const departureDateChangeHandler = (event) => {
        setDepartureTime(event.target.value)
    }

    const arrivalDateChangeHandler = (event) => {
        setArrivalTime(event.target.value)
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

    useEffect(() => {
        loadFlightList()
    }, [arrivalAirport, departureAirport, cabinClass, departureTime, arrivalTime]);

    return <>
        <NavigationBar/>

        <div className={`card mt-5 ring`}>
            <div className={`card-body`}>
                <div className={`row`}>
                    <div className={`col-12 col-lg-6 mb-3`}>
                        <label htmlFor="exampleInputPassword1" className="form-label">
                            From</label>
                        <select
                            name="classType"
                            id="classType"
                            className="form-select dropdown"
                            value={departureAirport}
                            onChange={departureAirportChangeHandler}
                        >
                            <option value="Sri Lanka" >Sri Lanka</option>
                            <option value="Australia">Australia</option>
                            <option value="Dubai">Dubai</option>
                        </select>
                    </div>

                    <div className={`col-12 col-lg-6 mb-3`}>
                        <label htmlFor="exampleInputPassword1" className="form-label">To</label>

                        <select
                            name="classType"
                            id="classType"
                            className="form-select dropdown"
                            value={arrivalAirport}
                            onChange={arrivalAirportChangeHandler}
                        >
                            <option value="Sri Lanka">Sri Lanka</option>
                            <option value="Australia">Australia</option>
                            <option value="Dubai">Dubai</option>
                        </select>
                    </div>

                    <div className={`col-12 col-lg-4 mb-3`}>
                        <label htmlFor="exampleInputPassword1" className="form-label">Departure Date</label>

                        <input
                            onChange={departureDateChangeHandler}
                            value={departureTime}
                            type="date"
                            className="form-control"
                            id="depatureDate"
                            placeholder="01/01/2000"
                        />
                    </div>

                    <div className={`col-12 col-lg-4 mb-3`}>
                        <label htmlFor="exampleInputPassword1" className="form-label">Arrival Date</label>

                        <input
                            onChange={arrivalDateChangeHandler}
                            type="date"
                            value={arrivalTime}
                            className="form-control"
                            id="depatureDate"
                            placeholder="01/01/2000"
                        />
                    </div>

                    <div className={`col-12 col-lg-4 mb-3`}>
                        <label htmlFor="exampleInputPassword1" className="form-label">Cabin Class</label>

                        <select
                            name="classType"
                            id="classType"
                            className="form-select dropdown"
                            value={cabinClass}
                            onChange={cabinClassChangeHandler}
                        >
                            <option value="Economy">Economy</option>
                            <option value="Business">Business</option>
                            <option value="First">First</option>
                        </select>
                    </div>


                    <div className={`col-12 mt-3`}>
                        <div className="d-grid gap-2">
                            <button type="submit" className="btn btn-dark">Flight Search</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className={`mt-5`}>
            <div className={`row g-3`}>
                {flightList.map((flight, index) => {
                        const seat = flight.seats;
                        const lowestPrice = Math.min(...seat.map(item => parseInt(item.price)));

                        const departureTime = new Date(flight.departureTime)
                        const humanReadableDepartureTime = `${departureTime.toLocaleDateString()} - ${departureTime.toLocaleTimeString()}`;

                        const arrivalTime = new Date(flight.arrivalTime)
                        const humanReadableArrivalTIme = `${arrivalTime.toLocaleDateString()} - ${arrivalTime.toLocaleTimeString()}`;

                        return <div key={index} className={` col-12 col-lg-6`}>
                            <div className={`card m-1`}>
                                <div className="card-body">
                                    <h5 className="card-title mb-4">{flight.airPlane}</h5>
                                    <div className={`row`}>
                                        <div className={`col-12 col-md-6 p-3`}>
                                            <p className="text-center text-lg-start">{flight.departureAirport}</p>
                                            <p className="text-center text-lg-start">{humanReadableDepartureTime}</p>
                                        </div>
                                        <div className={`col-12 col-md-6 p-3`}>
                                            <p className="text-center text-lg-end">{flight.arrivalAirport}</p>
                                            <p className="text-center text-lg-end">{humanReadableArrivalTIme}</p>
                                        </div>
                                        <div className={`col-12 px-3`}>
                                            <p className={`text-start`}>
                                                Tickets Starting from <strong>Rs. {lowestPrice}</strong>
                                            </p>
                                        </div>
                                    </div>
                                    <button onClick={() => addCart(flight)} className="btn btn-dark float-end mt-4">Book Flight</button>
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

export default FlightList
