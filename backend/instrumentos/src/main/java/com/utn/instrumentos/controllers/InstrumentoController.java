package com.utn.instrumentos.controllers;

import com.utn.instrumentos.entities.Instrumento;
import com.utn.instrumentos.services.InstrumentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/instrumentos")
public class InstrumentoController {
    @Autowired
    private InstrumentoService instrumentoService;

    @GetMapping
    public List<Instrumento> getAllInstrumentos() {
        return instrumentoService.getAllInstrumentos();
    }

    @GetMapping("/categorias/{categoriaId}")
    public List<Instrumento> getInstrumentosByCategoria(@PathVariable Long categoriaId) {
        return instrumentoService.getInstrumentosByCategoria(categoriaId);
    }

    @GetMapping("/{id}")
    public Instrumento getInstrumentoById(@PathVariable Long id) {
        return instrumentoService.getInstrumentoById(id);
    }

    @PostMapping
    public Instrumento createInstrumento(@RequestBody Instrumento instrumento) {
        return instrumentoService.createInstrumento(instrumento);
    }

    @PutMapping("/{id}")
    public Instrumento updateInstrumento(@PathVariable Long id, @RequestBody Instrumento instrumento) {
        instrumento.setIdinstrumento(id);
        return instrumentoService.updateInstrumento(instrumento);
    }

    @DeleteMapping("/{id}")
    public void deleteInstrumento(@PathVariable Long id) {
        instrumentoService.deleteInstrumento(id);
    }
}
