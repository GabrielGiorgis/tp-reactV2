package com.utn.instrumentos.services;

import com.utn.instrumentos.entities.PedidoDetalle;
import com.utn.instrumentos.repositories.PedidoDetalleRepository;
import org.apache.poi.xssf.streaming.SXSSFCell;
import org.apache.poi.xssf.streaming.SXSSFRow;
import org.apache.poi.xssf.streaming.SXSSFSheet;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

@Component
public class PedidoExcelManager {

    @Autowired
    private PedidoDetalleRepository pedidoDetalleRepository;

    public ByteArrayOutputStream generarExcelPedidos(LocalDate fechaDesde, LocalDate fechaHasta) throws IOException {
        SXSSFWorkbook libro = new SXSSFWorkbook(50); // Tamaño de paginación
        SXSSFSheet hoja = libro.createSheet();

        // Estilos para los encabezados
        XSSFFont fontEncabezado = (XSSFFont) libro.createFont();
        fontEncabezado.setBold(true);
        XSSFCellStyle styleEncabezado = (XSSFCellStyle) libro.createCellStyle();
        styleEncabezado.setFont(fontEncabezado);

        // Crear fila de encabezados
        SXSSFRow filaEncabezados = hoja.createRow(0);
        int columna = 0;
        crearCeldaEncabezado(filaEncabezados, columna++, "Fecha Pedido", styleEncabezado);
        crearCeldaEncabezado(filaEncabezados, columna++, "Instrumento", styleEncabezado);
        crearCeldaEncabezado(filaEncabezados, columna++, "Marca", styleEncabezado);
        crearCeldaEncabezado(filaEncabezados, columna++, "Modelo", styleEncabezado);
        crearCeldaEncabezado(filaEncabezados, columna++, "Cantidad", styleEncabezado);
        crearCeldaEncabezado(filaEncabezados, columna++, "Precio", styleEncabezado);
        crearCeldaEncabezado(filaEncabezados, columna++, "Subtotal", styleEncabezado);

        int filaActual = 1;
        List<PedidoDetalle> pedidoDetalles = pedidoDetalleRepository.findByPedidoFechaPedidoBetween(fechaDesde, fechaHasta);
            for (PedidoDetalle pedidoDetalle : pedidoDetalles) {
                SXSSFRow fila = hoja.createRow(filaActual++);
                int columnaFila = 0;
                crearCelda(fila, columnaFila++, pedidoDetalle.getPedido().getFechaPedido().toString());
                crearCelda(fila, columnaFila++, pedidoDetalle.getInstrumento().getInstrumento());
                crearCelda(fila, columnaFila++, pedidoDetalle.getInstrumento().getMarca());
                crearCelda(fila, columnaFila++, pedidoDetalle.getInstrumento().getModelo());
                crearCelda(fila, columnaFila++, pedidoDetalle.getCantidad());
                crearCelda(fila, columnaFila++, pedidoDetalle.getInstrumento().getPrecio());
                crearCelda(fila, columnaFila++, pedidoDetalle.getCantidad() * pedidoDetalle.getInstrumento().getPrecio());
            }

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        libro.write(outputStream);
        libro.close();
        return outputStream;
    }

    private void crearCeldaEncabezado(SXSSFRow fila, int columna, String valor, XSSFCellStyle style) {
        SXSSFCell celda = fila.createCell(columna);
        celda.setCellValue(valor);
        celda.setCellStyle(style);
    }

    private void crearCelda(SXSSFRow fila, int columna, Object valor) {
        SXSSFCell celda = fila.createCell(columna);
        if (valor instanceof String) {
            celda.setCellValue((String) valor);
        } else if (valor instanceof Double) {
            celda.setCellValue((Double) valor);
        } else if (valor instanceof Integer) {
            celda.setCellValue((Integer) valor);
        }
    }


}
