package com.utn.instrumentos.services;

import com.utn.instrumentos.entities.Pedido;
import com.utn.instrumentos.entities.PedidoDetalle;
import com.utn.instrumentos.repositories.PedidoDetalleRepository;
import com.utn.instrumentos.repositories.PedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PedidoDetalleService {
    @Autowired
    private PedidoDetalleRepository pedidoDetalleRepository;
    @Autowired
    private PedidoRepository pedidoRepository;
    public PedidoDetalle create(PedidoDetalle pedidoDetalle) {
        Pedido pedidoCreated = pedidoRepository.save(pedidoDetalle.getPedido());
        System.out.println(pedidoCreated.toString());
        return pedidoDetalleRepository.save(pedidoDetalle);
    }
    public List<PedidoDetalle> findAll() {
        return pedidoDetalleRepository.findAll();
    }
}
