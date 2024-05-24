package com.utn.instrumentos.repositories;

import com.utn.instrumentos.entities.PedidoDetalle;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PedidoDetalleRepository extends JpaRepository<PedidoDetalle, Long> {

}
