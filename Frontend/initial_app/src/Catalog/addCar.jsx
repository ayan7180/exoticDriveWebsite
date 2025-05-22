import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddCar = () => {
    const [car, setCar] = useState({
        model: "",
        driveTrain: "",
        mileage: "",
        price: "",
        type: "",
        imageURL: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCar((prev) => ({
            ...prev,
            [name]: value,
        }));
  };

    const navigate = useNavigate();

    const postCar = async(e) => {
        e.preventDefault();
        const url = "http://localhost:8080/addCar";
        try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(car),
        });
        if (!response.ok) throw new Error("Failed to add appointment");
            alert("Car added successfully!");
            setCar({
                model: "",
                driveTrain: "",
                mileage: "",
                price: "",
                type: "",
        });
        } catch (error) {
            alert(error.message);
        }
        navigate("/catalog")
    }

    return(
        <>
            <div className="bg-black min-h-screen p-6 text-center">
                <h1 className="text-4xl font-bold text-red-600 mb-8">
                    Add Car
                </h1>
                <form onSubmit={postCar} method="POST">
                    <input
                        type="text"
                        name="model"
                        placeholder="Model"
                        value={car.model}
                        onChange={handleChange}
                        className="w-200 pl-10 pr-4 py-2 border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                        type="text"
                        name="driveTrain"
                        placeholder="Drive train"
                        value={car.driveTrain}
                        onChange={handleChange}
                        className="w-200 pl-10 pr-4 py-2 border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                        type="text"
                        name="mileage"
                        placeholder="Mileage"
                        value={car.mileage}
                        onChange={handleChange}
                        className="w-200 pl-10 pr-4 py-2 border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                        type="text"
                        name="price"
                        placeholder="Price"
                        value={car.price}
                        onChange={handleChange}
                        className="w-200 pl-10 pr-4 py-2 border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                        type="text"
                        name="type"
                        placeholder="Car Type"
                        value={car.type}
                        onChange={handleChange}
                        className="w-200 pl-10 pr-4 py-2 border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button className="bg-red-600 text-white py-2 hover:bg-red-700 border-red-600 transition duration-300 w-200"
                        >
                        Add Car
                    </button>
                </form>
            </div>
        </>   
    )
}

export default AddCar;