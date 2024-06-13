package com.utn.instrumentos.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.utn.instrumentos.dto.InstrumentosJson;
import com.utn.instrumentos.entities.Categoria;
import com.utn.instrumentos.entities.Instrumento;
import com.utn.instrumentos.repositories.InstrumentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class InstrumentoService {
    @Autowired
    private InstrumentoRepository instrumentoRepository;

    @Autowired
    private ObjectMapper objectMapper;

    public List<Instrumento> getAllInstrumentos() {
        return instrumentoRepository.findAll();
    }

    public List<Instrumento> getInstrumentosByCategoria(Long categoriaId) {
        Categoria categoria = new Categoria();
        categoria.setIdcategoria(categoriaId);
        return instrumentoRepository.findByCategoria(categoria);
    }

    public Instrumento getInstrumentoById(Long id) {
        return instrumentoRepository.findById(id).orElse(null);
    }

    public Instrumento createInstrumento(Instrumento instrumento) {
        return instrumentoRepository.save(instrumento);
    }

    public Instrumento updateInstrumento(Instrumento instrumento) {
        return instrumentoRepository.save(instrumento);
    }

    public void deleteInstrumento(Long id) {
        instrumentoRepository.deleteById(id);
    }

    public List<Instrumento> loadInstrumentosFromJson() throws IOException {
        ClassPathResource resource = new ClassPathResource("data/instrumentos.json");
        InstrumentosJson instrumentosJson = objectMapper.readValue(resource.getInputStream(), InstrumentosJson.class);
        return instrumentoRepository.saveAll(instrumentosJson.getInstrumentos());
    }
}
