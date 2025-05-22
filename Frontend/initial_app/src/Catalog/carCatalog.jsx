import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useCar } from '../carContext';

const Catalog = ({ user }) => {
    const [catalog, setCatalog] = useState([]);
    const [query, setQuery] = useState("");
    const [admin, setAdmin] = useState(false);
    const { setSelectedCar } = useCar();
    const navigate = useNavigate();


    useEffect(() => {
        if (user?.admin === "1") {
            setAdmin(true);
        } else {
            setAdmin(false);
        }
        fetchCatalog()
    }, [user]);

    const handleView = (car) => {
        setSelectedCar(car)
        navigate('/viewCar', {
            state: {
                model: car.model, driveTrain: car.driveTrain,
                mileage: car.mileage, price: car.price, type: car.type, imageURL: car.imageURL
            }
        })
    }

    const fetchCatalog = async () => {
        try {
            const url = "http://localhost:8080/carCatalog";
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Failed to fetch catalog");
            }
            const data = await response.json();
            console.log("request made");
            setCatalog(data);
        } catch (error) {
            console.error("Error fetching catalog:", error);
        }
    }

    const handleSearch = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            console.log("Search submitted:", query);
            const results = catalog.filter((car) =>
                car.model.toLowerCase().includes(query.toLowerCase()) ||
                car.mileage.toLowerCase().includes(query.toLowerCase())
            );
            if (results.length > 0) {
                console.log("Matched cars:", results);
                setCatalog(results);
            } else {
                console.log("No cars matched your search.");
            }
        }
    }
    //Need to implement admin check, very easy
    const addCar = () => {
        navigate('/addCar')
    }

    const deleteCar = () => {
        navigate('/deleteCar')
    }

    return (
        <>
            <div className="bg-black min-h-screen p-6 text-center">
                <h1 className="text-4xl font-bold text-red-600 mb-8">
                    Our Catalog
                </h1>
                <div className="flex justify-center items-center py-10">
                    <input
                        type="text"
                        placeholder="Search mileage, model, or year..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleSearch}
                        className="w-200 pl-10 pr-4 py-2 border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {admin && (
                        <>
                            <button
                                type="button"
                                onClick={addCar}
                                className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 border-red-600 transition duration-300"
                            >
                                Add Car +
                            </button>
                            <button
                                type="button"
                                onClick={deleteCar}
                                className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 border-red-600 transition duration-300 ml-4"
                            >
                                Delete Car -
                            </button>
                        </>
                    )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {catalog.map((car, index) => (
                        <div
                            key={index}
                            className="bg-gray-900 border border-red-600 rounded-2xl p-5 shadow-xl hover:scale-105 transition-transform duration-300"
                        >
                            <img
                                src={car.imageURL}
                                alt={`${car.model} logo`}
                                className="w-full h-32 object-contain mb-4 bg-white rounded"
                            />
                            <h2 className="text-2xl font-semibold text-red-500 mb-1">
                                {car.model}
                            </h2>
                            <p className="text-gray-400 text-sm"><strong className="text-red-400">Mileage: </strong>{car.mileage}</p>
                            <p className="text-gray-400 text-sm">
                                <strong className="text-red-400">MSRP: </strong>{""}
                                ${car.price}
                            </p>
                            <button
                                type="submit"
                                className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition duration-300"
                                onClick={() => handleView(car)}
                            >
                                View Car
                            </button>
                        </div>
                    ))}
                </div>
            </div >
        </>
    );
}

export default Catalog;