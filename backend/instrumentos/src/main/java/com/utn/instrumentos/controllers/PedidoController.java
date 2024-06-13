package com.utn.instrumentos.controllers;

import com.utn.instrumentos.entities.Pedido;
import com.utn.instrumentos.entities.PreferenceMP;
import com.utn.instrumentos.repositories.PedidoRepository;
import com.utn.instrumentos.services.PedidoExcelManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/pedidos")
public class PedidoController {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private PedidoExcelManager pedidoExcelManager;

    @PostMapping
    public Pedido createPedido(@RequestBody Pedido pedido) {
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

    // CHARTS
    @GetMapping("/datachartbar")
    public List<List<Object>> getDataChartBar() {
        List<List<Object>> data = new ArrayList<>();
        data.add(Arrays.asList("Mes-Año", "Cantidad de Pedidos"));

        // Consulta a la base de datos para obtener la cantidad de pedidos agrupados por mes y año
        List<Object[]> resultados = pedidoRepository.getCountPedidosPorMesYAnio();

        for (Object[] resultado : resultados) {
            String mesAnio = resultado[0].toString(); // Mes y año en formato "YYYY-MM"
            Long cantidadPedidos = (Long) resultado[1];
            data.add(Arrays.asList(mesAnio, cantidadPedidos));
        }

        return data;
    }

    @GetMapping("/datachartpie")
    public List<List<Object>> getDataChartPie() {
        List<List<Object>> data = new ArrayList<>();
        data.add(Arrays.asList("Instrumento", "Cantidad de Pedidos"));

        // Consulta a la base de datos para obtener la cantidad de pedidos agrupados por instrumento
        List<Object[]> resultados = pedidoRepository.getCountPedidosPorInstrumento();

        for (Object[] resultado : resultados) {
            String instrumento = (String) resultado[0];
            BigDecimal cantidadPedidosBD = (BigDecimal) resultado[1]; // Get the value as BigDecimal
            Long cantidadPedidos = cantidadPedidosBD.longValue(); // Convert to Long
            data.add(Arrays.asList(instrumento, cantidadPedidos));
        }

        return data;
    }

    // EXCEL
    @GetMapping("/downloadExcelPedidos")
    public ResponseEntity<byte[]> downloadExcelPedidos(@RequestParam LocalDate fechaDesde, @RequestParam LocalDate fechaHasta) {
        try {
            ByteArrayOutputStream outputStream = pedidoExcelManager.generarExcelPedidos(fechaDesde, fechaHasta);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"));
            headers.setContentDispositionFormData("attachment", "reportePedidos.xlsx");
            headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");

            return new ResponseEntity<>(outputStream.toByteArray(), headers, HttpStatus.OK);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
