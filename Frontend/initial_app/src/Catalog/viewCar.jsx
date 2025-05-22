import { useLocation } from 'react-router-dom';
import { useCar } from '../carContext';

const ViewCar = () => {
    const { selectedCar } = useCar();

    if (!selectedCar) return <p>No car selected.</p>;

    return (
        <>
            <div className="bg-black min-h-screen p-6 text-white">
                {/* Car Image */}
                <div className="carousel w-full">
                    <div id="slide1" className="carousel-item relative w-full">
                        <img
                            src={selectedCar.imageURL}
                            className="w-full"
                        />
                        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                            <a href="#slide4" className="btn btn-circle">
                                ❮
                            </a>
                            <a href="#slide2" className="btn btn-circle">
                                ❯
                            </a>
                        </div>
                    </div>
                    <div id="slide2" className="carousel-item relative w-full">
                        <img
                            src={selectedCar.imageURL2}
                            className="w-full"
                        />
                        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                            <a href="#slide1" className="btn btn-circle">
                                ❮
                            </a>
                            <a href="#slide3" className="btn btn-circle">
                                ❯
                            </a>
                        </div>
                    </div>
                    <div id="slide3" className="carousel-item relative w-full">
                        <img
                            src={selectedCar.imageURL3}
                            className="w-full"
                        />
                        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                            <a href="#slide2" className="btn btn-circle">
                                ❮
                            </a>
                            <a href="#slide4" className="btn btn-circle">
                                ❯
                            </a>
                        </div>
                    </div>
                </div>

                {/* Info Card */}
                <div className="bg-gray-900 border border-red-600 rounded-2xl p-6 shadow-xl">
                    <h1 className="text-2xl font-bold text-red-400 mb-4">{selectedCar.model}</h1>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-300">
                        <p><span className="text-red-400 font-semibold">Mileage:</span> {selectedCar.mileage}</p>
                        <p><span className="text-red-400 font-semibold">Drive Train:</span> {selectedCar.driveTrain}</p>
                        <p><span className="text-red-400 font-semibold">Type:</span> {selectedCar.type}</p>
                        <p><span className="text-red-400 font-semibold">Price:</span> ${selectedCar.price}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ViewCar;