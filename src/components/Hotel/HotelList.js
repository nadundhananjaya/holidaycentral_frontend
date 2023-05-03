import react, {useEffect, useState} from "react";
import NavigationBar from "../NavigationBar/NavigationBar";


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

function dateDiffInDays(a, b) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

const HotelList = () => {


    const [hotelList, setHotelList] = useState([])

    const [checkInDate, setCheckInDate] = useState(getCurrentDate());
    const [checkOutDate, setCheckOutDate] = useState(getDayAfterWeek())
    const [destination, setDestination] = useState('Colombo')

    const loadHotelList = async () => {
        const response = await fetch('http://192.168.1.240:8080/hotel/list', {
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
                "checkInDate": checkInDate,
                "checkOutDate": checkOutDate,
                "destination": destination,
            })
        });
        const data = await response.json();
        setHotelList(data)
    }


    const checkinDateChangeHandler = (event) => {
        setCheckInDate(event.target.value)
    }

    const checkOutDateChangeHandler = (event) => {
        setCheckOutDate(event.target.value)
    }

    const destinationChangeHandler = (event) => {
        setDestination(event.target.value)
    }
    useEffect(() => {
        loadHotelList()
    }, [checkInDate, checkOutDate, destination]);

    return <>
        <NavigationBar/>

        <div className={`card mt-5 ring`}>
            <div className={`card-body`}>
                <div className={`row`}>


                    <div className={`col-12 col-lg-4 mb-3`}>
                        <label htmlFor="exampleInputPassword1" className="form-label">Checkin Date</label>

                        <input
                            onChange={checkinDateChangeHandler}
                            value={checkInDate}
                            type="date"
                            className="form-control"
                            id="checkInDate"
                            placeholder="01/01/2000"
                        />
                    </div>

                    <div className={`col-12 col-lg-4 mb-3`}>
                        <label htmlFor="exampleInputPassword1" className="form-label">Checkout Date</label>

                        <input
                            onChange={checkOutDateChangeHandler}
                            type="date"
                            value={checkOutDate}
                            className="form-control"
                            id="checkOutDate"
                            placeholder="01/01/2000"
                        />
                    </div>

                    <div className={`col-12 col-lg-4 mb-3`}>
                        <label htmlFor="exampleInputPassword1" className="form-label">Destination</label>

                        <select
                            name="classType"
                            id="classType"
                            className="form-select dropdown"
                            value={destination}
                            onChange={destinationChangeHandler}
                        >
                            <option value="Colombo">Colombo</option>
                            <option value="Kandy">Kandy</option>
                            <option value="Anuradhapura">Anuradhapura</option>
                        </select>
                    </div>


                    <div className={`col-12 mt-3`}>
                        <div className="d-grid gap-2">
                            <button type="submit" className="btn btn-dark">Hotel Search</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className={`mt-5`}>
            <div className={`row g-3`}>
                {hotelList.map((hotel, index) => {
                        const rooms = hotel.rooms;
                        const lowestPrice = Math.min(...rooms.map(item => parseInt(item.pricePerNight)));
                        const noOfDays = dateDiffInDays(new Date(checkInDate), new Date(checkOutDate))

                        const facilities = hotel.facilities.join(',')
                        return <div key={index} className={` col-12 col-lg-6`}>
                            <div className={`card m-1`}>
                                <div className="card-body">
                                    <h5 className="card-title mb-4">{hotel.hotelName}</h5>
                                    <p>Star Rating : {hotel.starRating}</p>

                                    <p>Contact No : {hotel.contact}</p>
                                    <div className={`row`}>
                                        <div className={`col-12 px-3`}>
                                            <p className={`text-start`}>
                                                Booking Starting from <strong>Rs. {lowestPrice * noOfDays}</strong>
                                            </p>
                                            <p className={`text-start`}>
                                                Bill Per Day Starting from <strong>Rs. {lowestPrice}</strong>
                                            </p>
                                        </div>
                                    </div>

                                    <div className={`row`}>
                                        <div className={`col-12 px-3`}>
                                            <p className={`text-start`}>
                                                Facilities : <strong>{
                                                facilities
                                            }</strong>
                                            </p>

                                        </div>
                                    </div>
                                    <a href="#" className="btn btn-dark float-end mt-4">Book Hotel</a>
                                </div>
                            </div>
                        </div>
                    }
                )}
            </div>
        </div>
    </>
}
export default HotelList
