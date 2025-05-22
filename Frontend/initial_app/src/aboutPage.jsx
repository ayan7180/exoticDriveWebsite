import { useState, useEffect } from 'react';
import { aboutProfile as aboutData } from './data/aboutProfile.js';


const About = () => {
    const [about, setAbout] = useState([]);

    useEffect(() => {
        setAbout(aboutData);
    }, []);

    return (
        <div className="about-page bg-black min-h-screen p-6">
            <h1 className="text-4xl font-bold text-red-600 mb-8 text-center">About Us</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {about.map((item, index) => (
                    <div
                        key={index}
                        className="bg-gray-900 border border-red-600 rounded-2xl p-5 shadow-xl hover:scale-105 transition-transform duration-300"
                    >
                        <img
                            src={item.imageURL}
                            alt={`${item.name} image`}
                            className="w-full h-100 object-contain mb-4 bg-white rounded"
                        />
                        <h2 className="text-2xl font-semibold text-red-500 mb-1">{item.name}</h2>
                        <p className="text-gray-300 mb-2">{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default About;
