package com.utn.instrumentos.controllers;

import com.utn.instrumentos.entities.Instrumento;
import com.utn.instrumentos.services.InstrumentoPdfManager;
import com.utn.instrumentos.services.InstrumentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayOutputStream;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/instrumentos")
public class InstrumentoController {
    @Autowired
    private InstrumentoService instrumentoService;

    @Autowired
    private InstrumentoPdfManager instrumentoPdfManager;

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

    // PDF
    @GetMapping("/downloadPdfInstrumento/{id}")
    public ResponseEntity<byte[]> downloadPdf(@PathVariable Long id) {
        try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
            InstrumentoPdfManager mPrintPdf = new InstrumentoPdfManager();
            // Crear un nuevo documento
            mPrintPdf.downloadPdf(id, outputStream);

            // Obtener la fecha y hora actual
            LocalDateTime dateTime = LocalDateTime.now();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd-HH-mm-ss");
            String formattedDateTime = dateTime.format(formatter);

            // Establecer el nombre del archivo con la fecha y hora actual
            String filename = "instrumento_" + formattedDateTime + ".pdf";

            // Establecer las cabeceras de la respuesta
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.parseMediaType("application/pdf"));
            headers.setContentDispositionFormData("attachment", filename);
            headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");

            // Devolver el archivo PDF como parte de la respuesta HTTP
            return new ResponseEntity<>(outputStream.toByteArray(), headers, HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
