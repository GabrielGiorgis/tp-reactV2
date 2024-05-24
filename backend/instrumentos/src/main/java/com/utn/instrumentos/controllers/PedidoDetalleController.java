package com.utn.instrumentos.controllers;

import com.utn.instrumentos.entities.Pedido;
import com.utn.instrumentos.entities.PedidoDetalle;
import com.utn.instrumentos.repositories.PedidoDetalleRepository;
import com.utn.instrumentos.services.PedidoDetalleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/pedido-detalle")
public class PedidoDetalleController {
    @Autowired
    private PedidoDetalleService pedidoDetalleService;
    @PostMapping
    public PedidoDetalle addPedidoDetalle(@RequestBody PedidoDetalle pedidoDetalle) {
        return pedidoDetalleService.create(pedidoDetalle);
    }
    @GetMapping
    public List<PedidoDetalle> getAllPedidoDetalle() {
        return pedidoDetalleService.findAll();
    }
}
