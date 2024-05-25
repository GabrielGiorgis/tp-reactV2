package com.utn.instrumentos.controllers;

import com.utn.instrumentos.entities.Pedido;
import com.utn.instrumentos.entities.PreferenceMP;
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
    @PostMapping("/create_preference_mp")
    public PreferenceMP crearPreferenceMP(@RequestBody Pedido pedido){
        MercadoPagoController cMercadoPago  = new MercadoPagoController();
        PreferenceMP preference = cMercadoPago.getPreferenciaIdMercadoPago(pedido);
        return preference;
    }
}
