package com.utn.instrumentos.services;

import com.lowagie.text.Document;
import com.lowagie.text.DocumentException;
import com.lowagie.text.Element;
import com.lowagie.text.Font;
import com.lowagie.text.Image;
import com.lowagie.text.PageSize;
import com.lowagie.text.Paragraph;
import com.lowagie.text.Phrase;
import com.lowagie.text.Rectangle;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import com.utn.instrumentos.entities.Instrumento;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.awt.Color;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.net.MalformedURLException;

@Component
public class InstrumentoPdfManager {
    @Autowired
    private InstrumentoService instrumentoService;

    protected static Font titulo = new Font(Font.COURIER, 14, Font.BOLD);
    protected static Font redFont = new Font(Font.COURIER, 12, Font.NORMAL, Color.RED);
    protected static Font textoHeader = new Font(Font.COURIER, 17, Font.BOLD);
    protected static Font texto = new Font(Font.COURIER, 11, Font.NORMAL);
    protected static Font textoBold = new Font(Font.COURIER, 11, Font.BOLD);
    protected static Font textoMini = new Font(Font.COURIER, 8, Font.NORMAL);
    protected static Font textoMiniBold = new Font(Font.COURIER, 8, Font.BOLD);
    protected static Font textoBig = new Font(Font.COURIER, 50, Font.BOLD);

    public static void addEmptyLine(Document document, int number) {
        try {
            Paragraph espacio = new Paragraph();
            for (int i = 0; i < number; i++) {
                espacio.add(new Paragraph(" "));
            }
            document.add(espacio);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void setLineaReporte(Document document) throws DocumentException, MalformedURLException, IOException {
        PdfPTable linea = new PdfPTable(1);
        linea.setWidthPercentage(100.0f);
        PdfPCell cellOne = new PdfPCell(new Paragraph(""));
        cellOne.setBorder(Rectangle.BOTTOM);
        cellOne.setBorder(Rectangle.TOP);
        linea.addCell(cellOne);

        document.add(linea);
    }

    public ResponseEntity<byte[]> downloadPdf(Long instrumentoId, ByteArrayOutputStream outputStream) {
        try {
            Document document = new Document(PageSize.A4, 30, 30, 0, 30);

            Instrumento instrumento = instrumentoService.getInstrumentoById(instrumentoId);

            PdfWriter.getInstance(document, outputStream);
            document.open();

            // Encabezado
            PdfPTable tableCabecera = new PdfPTable(2);
            tableCabecera.setWidthPercentage(100f);

            Image imgCabeceraLeft = Image.getInstance("http://localhost:8080/images/logo-utn.png");
            imgCabeceraLeft.scalePercent(70f);
            imgCabeceraLeft.setBorderColorBottom(Color.BLACK);
            Image imgCabeceraRight = Image.getInstance("http://localhost:8080/images/logo-instrumentos.png");
            imgCabeceraRight.scalePercent(70f);
            imgCabeceraRight.setBorderColorBottom(Color.BLACK);

            PdfPCell logoUTN = new PdfPCell(imgCabeceraLeft);
            logoUTN.setBorder(Rectangle.NO_BORDER);
            logoUTN.setHorizontalAlignment(PdfPCell.ALIGN_LEFT);
            PdfPCell logoInstrumentos = new PdfPCell(imgCabeceraRight);
            logoInstrumentos.setBorder(Rectangle.NO_BORDER);
            logoInstrumentos.setHorizontalAlignment(PdfPCell.ALIGN_RIGHT);

            tableCabecera.addCell(logoUTN);
            tableCabecera.addCell(logoInstrumentos);

            document.add(tableCabecera);

            addEmptyLine(document, 1);
            setLineaReporte(document);
            // Fin encabezado

            Paragraph paragraph = new Paragraph(instrumento.getInstrumento().toUpperCase(), titulo);
            paragraph.setAlignment(Element.ALIGN_CENTER);
            document.add(paragraph);

            Image imgInstrumento = Image.getInstance("http://localhost:8080/images/" + instrumento.getImagen());
            imgInstrumento.scaleAbsolute(500f, 300f);

            document.add(imgInstrumento);

            addEmptyLine(document, 2);

            PdfPTable table = new PdfPTable(2);
            table.setWidthPercentage(100);

            PdfPCell celdaIzq = new PdfPCell(new Phrase("Instrumento:", textoBold));
            celdaIzq.setBorder(Rectangle.NO_BORDER);
            PdfPCell celdaDer = new PdfPCell(new Phrase(instrumento.getInstrumento(), texto));
            celdaDer.setBorder(Rectangle.NO_BORDER);
            table.addCell(celdaIzq);
            table.addCell(celdaDer);

            celdaIzq = new PdfPCell(new Phrase("Marca:", textoBold));
            celdaIzq.setBorder(Rectangle.NO_BORDER);
            celdaDer = new PdfPCell(new Phrase(instrumento.getMarca(), texto));
            celdaDer.setBorder(Rectangle.NO_BORDER);
            table.addCell(celdaIzq);
            table.addCell(celdaDer);

            celdaIzq = new PdfPCell(new Phrase("Modelo:", textoBold));
            celdaIzq.setBorder(Rectangle.NO_BORDER);
            celdaDer = new PdfPCell(new Phrase(instrumento.getModelo(), texto));
            celdaDer.setBorder(Rectangle.NO_BORDER);
            table.addCell(celdaIzq);
            table.addCell(celdaDer);

            celdaIzq = new PdfPCell(new Phrase("Precio:", textoBold));
            celdaIzq.setBorder(Rectangle.NO_BORDER);
            celdaDer = new PdfPCell(new Phrase(instrumento.getPrecio().toString(), texto));
            celdaDer.setBorder(Rectangle.NO_BORDER);
            table.addCell(celdaIzq);
            table.addCell(celdaDer);

            celdaIzq = new PdfPCell(new Phrase("Costo de Envío:", textoBold));
            celdaIzq.setBorder(Rectangle.NO_BORDER);
            celdaDer = new PdfPCell(new Phrase(instrumento.getCostoenvio(), texto));
            celdaDer.setBorder(Rectangle.NO_BORDER);
            table.addCell(celdaIzq);
            table.addCell(celdaDer);

            celdaIzq = new PdfPCell(new Phrase("Categoría:", textoBold));
            celdaIzq.setBorder(Rectangle.NO_BORDER);
            celdaDer = new PdfPCell(new Phrase(instrumento.getCategoria().getDenominacion(), texto));
            celdaDer.setBorder(Rectangle.NO_BORDER);
            table.addCell(celdaIzq);
            table.addCell(celdaDer);

            celdaIzq = new PdfPCell(new Phrase("Descripción:", textoBold));
            celdaIzq.setBorder(Rectangle.NO_BORDER);
            celdaDer = new PdfPCell(new Phrase(instrumento.getDescripcion(), texto));
            celdaDer.setBorder(Rectangle.NO_BORDER);
            table.addCell(celdaIzq);
            table.addCell(celdaDer);

            document.add(table);

            document.close();

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.parseMediaType("application/pdf"));
            headers.setContentDispositionFormData("attachment", "instrumento.pdf");
            headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");

            return new ResponseEntity<>(outputStream.toByteArray(), headers, HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}