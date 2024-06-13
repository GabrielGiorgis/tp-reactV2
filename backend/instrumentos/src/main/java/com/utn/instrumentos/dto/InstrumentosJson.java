package com.utn.instrumentos.dto;

import java.util.List;

import com.utn.instrumentos.entities.Instrumento;
import lombok.Data;

@Data
public class InstrumentosJson {
    private List<Instrumento> instrumentos;
}
