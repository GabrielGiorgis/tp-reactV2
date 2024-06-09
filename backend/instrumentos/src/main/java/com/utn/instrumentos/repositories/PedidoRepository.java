package com.utn.instrumentos.repositories;

import com.utn.instrumentos.entities.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    @Query(value = "SELECT DATE_FORMAT(fecha_pedido, '%Y-%m') AS mes_anio, COUNT(*) AS cantidad_pedidos " +
            "FROM pedido " +
            "GROUP BY mes_anio " +
            "ORDER BY mes_anio", nativeQuery = true)
    List<Object[]> getCountPedidosPorMesYAnio();

    @Query(value = "SELECT i.instrumento, COUNT(*) AS cantidad_pedidos " +
            "FROM pedido p " +
            "JOIN pedido_detalle pd ON p.id_pedido = pd.pedido " +
            "JOIN instrumento i ON pd.instrumento = i.idinstrumento " +
            "GROUP BY i.instrumento", nativeQuery = true)
    List<Object[]> getCountPedidosPorInstrumento();

}
