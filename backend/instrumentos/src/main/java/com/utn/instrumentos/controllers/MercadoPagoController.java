package com.utn.instrumentos.controllers;
// SDK de Mercado Pago
import com.mercadopago.MercadoPagoConfig;
import com.mercadopago.client.preference.PreferenceBackUrlsRequest;
import com.mercadopago.client.preference.PreferenceClient;
import com.mercadopago.client.preference.PreferenceItemRequest;
import com.mercadopago.client.preference.PreferenceRequest;
import com.mercadopago.resources.preference.Preference;
import com.utn.instrumentos.entities.Pedido;
import com.utn.instrumentos.entities.PreferenceMP;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class MercadoPagoController {
    public PreferenceMP getPreferenciaIdMercadoPago(Pedido pedido){
        try{
            MercadoPagoConfig.setAccessToken("TEST-3240024548426588-052416-79f1314bbfa3e3005597f17ee3e79039-613409765");
            PreferenceItemRequest itemRequest = PreferenceItemRequest.builder()
                    .id("1234") // EN EL BUEN SABOR DEBERIAMOS PASARLE EL ID IDENTIFICADOR DEL PEDIDO (se guarda el pedido en BD y despues se hace la preferencia)
                    .title(pedido.getTitulo())
                    .description("Pedido realizado desde el carrito de compras")
                    .pictureUrl("url")
                    .quantity(1)
                    .currencyId("ARG")
                    .unitPrice(new BigDecimal(pedido.getTotalPedido()))
                    .build();
            List<PreferenceItemRequest> items = new ArrayList<>();
            items.add(itemRequest);

            PreferenceBackUrlsRequest backUrl = PreferenceBackUrlsRequest.builder().success("http://localhost:5173/instrumentos")
                    .pending("http://localhost:5173/instrumentos").failure("http://localhost:5173/instrumentos").build();

            PreferenceRequest preferenceRequest = PreferenceRequest.builder()
                    .items(items)
                    .backUrls(backUrl)
                    .build();
            PreferenceClient client = new PreferenceClient();
            Preference preference = client.create(preferenceRequest);

            PreferenceMP mpPreference = new PreferenceMP();
            mpPreference.setStatusCode(preference.getResponse().getStatusCode());
            mpPreference.setId(preference.getId());
            return mpPreference;
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }
}
