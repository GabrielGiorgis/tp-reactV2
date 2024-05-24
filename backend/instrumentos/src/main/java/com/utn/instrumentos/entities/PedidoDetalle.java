package com.utn.instrumentos.entities;

import jakarta.persistence.*;
import lombok.*;

import javax.sound.midi.Instrument;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class PedidoDetalle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idPedidoDetalle;

    private int cantidad;

    @ManyToOne
    @JoinColumn(name = "Pedido")
    private Pedido pedido;

    @ManyToOne
    @JoinColumn(name = "Instrumento")
    private Instrumento instrumento;
}
