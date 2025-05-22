import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DeleteCar = () => {
    const [catalog, setCatalog] = useState([]);

    useEffect(() => {
        fetchCatalog()
    }, []);

    const navigate = useNavigate();

    const fetchCatalog = async () => {
        try {
            const url = "http://localhost:8080/carCatalog";
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Failed to fetch catalog");
            }
            const data = await response.json();
            console.log("request made")
            setCatalog(data);
        } catch (error) {
            console.error("Error fetching catalog:", error);
        }
    }

    const handleDelete = async (carID) => {
        console.log("Delete button clicked, carID:", carID);
        try {
            const res = await fetch(
                `http://localhost:8080/deleteCar/${carID}`,
                {
                    method: "DELETE",
                    credentials: "include",
                }
            );
            if (!res.ok) {
                throw new Error("Failed to delete car");
            }
            // Update the catalog state
            setCatalog(prevCatalog => {
                const updated = prevCatalog.filter(car => car._id !== carID);
                console.log("Updated catalog length:", updated.length);
                return updated;
            });
            await fetchCatalog();

            alert("Car deleted successfully!");
        } catch (err) {
            console.error("Error deleting car:", err);
            alert(err.message || "Error deleting car. Please try again.");
        }
    };


    return (
        <>
            <div className="bg-black min-h-screen p-6 text-center">
                <h1 className="text-4xl font-bold text-red-600 mb-8">
                    Catalog
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {catalog.map((car) => (
                        <div
                            key={car._id}
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
                                onClick={() => handleDelete(car._id)}
                            >
                                Delete Car
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default DeleteCar;