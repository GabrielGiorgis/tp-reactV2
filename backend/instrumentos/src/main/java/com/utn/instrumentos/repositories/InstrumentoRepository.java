package com.utn.instrumentos.repositories;

import com.utn.instrumentos.entities.Categoria;
import com.utn.instrumentos.entities.Instrumento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InstrumentoRepository extends JpaRepository<Instrumento, Long> {
    List<Instrumento> findByCategoria(Categoria categoria);
}
