import { Carousel } from "react-bootstrap"
import "./StyleSheets/StyleLanding.css"

export const Landing = () => {
    return (
        <>
            <h2>Musical Hendrix</h2>

            <section id="landing-section">
                <Carousel id="carrusel">
                    <Carousel.Item>
                        <img src="../../landingImg/guitarras_1.jpg" className="d-block w-100" />

                    </Carousel.Item>
                    <Carousel.Item>
                        <img src="../../landingImg/guitarras_2.jpg" className="d-block w-100" />

                    </Carousel.Item>
                    <Carousel.Item>
                        <img src="../../landingImg/guitarras_3.jpg" className="d-block w-100" />

                    </Carousel.Item>
                </Carousel>
            </section>
        </>
    )
}
