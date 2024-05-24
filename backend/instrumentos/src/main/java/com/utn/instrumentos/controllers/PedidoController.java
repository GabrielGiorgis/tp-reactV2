package com.utn.instrumentos.controllers;

import com.utn.instrumentos.entities.Pedido;
import com.utn.instrumentos.repositories.PedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/pedidos")
public class PedidoController {
    @Autowired
    private PedidoRepository pedidoRepository;
    @PostMapping
    public Pedido createPeido(@RequestBody Pedido pedido) {
        return pedidoRepository.save(pedido);
    }
    @GetMapping
    public List<Pedido> findAll() {
        return pedidoRepository.findAll();
    }
}
