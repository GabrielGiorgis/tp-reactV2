package com.utn.instrumentos.repositories;

import com.utn.instrumentos.entities.PedidoDetalle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface PedidoDetalleRepository extends JpaRepository<PedidoDetalle, Long> {
    @Query("SELECT pd FROM PedidoDetalle pd WHERE pd.pedido.fechaPedido BETWEEN :fechaDesde AND :fechaHasta")
    List<PedidoDetalle> findByPedidoFechaPedidoBetween(@Param("fechaDesde") LocalDate fechaDesde, @Param("fechaHasta") LocalDate fechaHasta);
}
