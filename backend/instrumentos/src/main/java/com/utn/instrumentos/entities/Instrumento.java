package com.utn.instrumentos.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class Instrumento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idinstrumento;

    private String instrumento;
    private String marca;
    private String modelo;
    private String imagen;
    private Double precio;
    private String costoenvio;
    private Integer cantidadvendida;
    private String descripcion;
    private int cantidadEnPedido;

    @ManyToOne
    @JoinColumn(name = "idcategoria")
    private Categoria categoria;

}
