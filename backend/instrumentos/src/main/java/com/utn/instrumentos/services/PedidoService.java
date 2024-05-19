package com.utn.instrumentos.services;

import com.utn.instrumentos.entities.Pedido;
import com.utn.instrumentos.repositories.PedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PedidoService {
    @Autowired
    private PedidoRepository pedidoRepository;
    public void createPedido(Pedido pedido) {
        pedidoRepository.save(pedido);
    }




}
