package com.utn.instrumentos.repositories;

import com.utn.instrumentos.entities.Categoria;
import com.utn.instrumentos.entities.Instrumento;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InstrumentoRepository extends JpaRepository<Instrumento, Long> {
    List<Instrumento> findByCategoria(Categoria categoria);
}
