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
                        <Carousel.Caption>
                            <h3>First slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src="../../landingImg/guitarras_2.jpg" className="d-block w-100" />
                        <Carousel.Caption>
                            <h3>Second slide label</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src="../../landingImg/guitarras_3.jpg" className="d-block w-100" />
                        <Carousel.Caption>
                            <h3>Third slide label</h3>
                            <p>
                                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                            </p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </section>
        </>
    )
}
