import Iframe from "react-iframe"
import "./StyleSheets/StyleLanding.css"

function Ubicacion() {
    return (
        <>
            <br /><br /><br />
            <h2>Donde encontrarnos</h2>
            <section id="seccion-ubicacion">
                <Iframe
                    url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3350.4482399603867!2d-68.84085262499413!3d-32.88631516884272!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967e091ed2dd83f7%3A0xf41c7ab7e3522157!2sAv.%20San%20Mart%C3%ADn%20%26%20Av.%20Las%20Heras%2C%20Capital%2C%20Mendoza!5e0!3m2!1ses-419!2sar!4v1714144674251!5m2!1ses-419!2sar"
                    width="600px"
                    height="450px"
                    id="myId"
                    className="myClassname"
                    display="initial"
                    position="relative"
                    allowFullScreen
                />
            </section>
        </>
    )
}

export default Ubicacion;