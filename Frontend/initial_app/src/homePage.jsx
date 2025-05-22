const Home = () => {
  return (
    <>
      <div className="carousel w-full">
        <div id="slide1" className="carousel-item relative w-full">
          <img
            src="https://www.motortrend.com/uploads/2022/02/2021-BMW-M4-6M-PVOTY22-20.jpg"
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
            src="https://media.ed.edmunds-media.com/bmw/m3/2022/oem/2022_bmw_m3_sedan_competition_fq_oem_1_1600.jpg"
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
            src="https://media.wired.com/photos/6423826d7f6ce88e606d7b55/16:9/w_1900,h_1069,c_limit/Lamborghini-Revuelto-Featured-Gear.jpg"
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
        <div id="slide4" className="carousel-item relative w-full">
          <img
            src="https://media-r2.carsandbids.com/cdn-cgi/image/width=2080,quality=70/d32c8dde23a1411d0ef2e05bea168897e96c369b/photos/3z8zvW6J-Z45I1UwUPH-(edit).jpg?t=170672405965"
            className="w-full"
          />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide3" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide1" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
      </div>

      <div className="bg-black min-h-screen w-full items-center justify-center pt-10">
        <h1
          className="text-4xl font-bold text-red-600 mb-8 text-center"
          style={{ fontFamily: "'Brush Script MT', cursive" }}
        >
          Exotic Drive
        </h1>
        <p
          className="text-2xl font-bold text-red-600 mb-8 text-center"
          style={{ fontFamily: "'Brush Script MT', cursive" }}
        >
          “Unleash Power. Embrace Luxury. Drive the Extraordinary.” - Someone
        </p>
        <p
          className="text-2xl font-bold text-red-600 mb-8 text-center"
          style={{ fontFamily: "'Brush Script MT', cursive" }}
        >
          Check out our signature brands, catalog of vehicles, or submit a form
          for service.
        </p>
      </div>
    </>
  );
};
export default Home;
