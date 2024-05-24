package com.utn.instrumentos.repositories;

import com.utn.instrumentos.entities.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


public interface PedidoRepository extends JpaRepository<Pedido, Long> {
}
