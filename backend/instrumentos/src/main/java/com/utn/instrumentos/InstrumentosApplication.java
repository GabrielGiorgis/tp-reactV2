package com.utn.instrumentos;

import com.utn.instrumentos.entities.Categoria;
import com.utn.instrumentos.entities.Instrumento;
import com.utn.instrumentos.repositories.CategoriaRepository;
import com.utn.instrumentos.repositories.InstrumentoRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class InstrumentosApplication {

    @Autowired
    private CategoriaRepository categoriaRepository;

    @Autowired
    private InstrumentoRepository instrumentoRepository;

    public static void main(String[] args) {
        SpringApplication.run(InstrumentosApplication.class, args);
        System.out.println("Server started");
    }

    /*@Bean
    @Transactional
    CommandLineRunner init(CategoriaRepository categoriaRepository, InstrumentoRepository instrumentoRepository) {
        return args -> {
            Categoria categoriaCuerda = new Categoria();
            categoriaCuerda.setDenominacion("Cuerda");
            categoriaRepository.save(categoriaCuerda);

            Instrumento instrumento1 = new Instrumento();
            instrumento1.setInstrumento("Guitarra");
            instrumento1.setCategoria(categoriaCuerda);
            instrumento1.setCantidadvendida(3);
            instrumento1.setDescripcion("Guitarra electrica");
            instrumento1.setImagen("guitarra.jpg");
            instrumento1.setMarca("Yamaha");
            instrumento1.setModelo("Gibson");
            instrumento1.setCostoenvio("G");
            instrumentoRepository.save(instrumento1);


        };
    }*/
}
