package com.utn.instrumentos.entities;

import jakarta.persistence.*;
import org.hibernate.cache.spi.support.AbstractReadWriteAccess;

import java.time.Instant;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
public class Pedido {
    @Id
    @GeneratedValue
    private Long idPedido;

    @OneToMany
    @JoinColumn(name = "pedido_id")
    private List<Instrumento> instrumentos;
}
