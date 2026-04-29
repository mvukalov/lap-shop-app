package com.example;

import jakarta.transaction.Transactional;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.WebApplicationException;
import jakarta.ws.rs.core.MediaType;

import java.util.List;

@Path("/api/orders")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ShopOrderResource {

    @GET
    public List<ShopOrder> getAll() {
        return ShopOrder.listAll();
    }

    @POST
    @Transactional
    public ShopOrder create(CreateShopOrderRequest req) {

        if (req == null || req.laptopId == null) {
            throw new WebApplicationException("laptopId is required", 400);
        }

        Laptop laptop = Laptop.findById(req.laptopId);
        if (laptop == null) {
            throw new WebApplicationException("Laptop not found", 404);
        }

        ShopOrder order = new ShopOrder();
        order.customerFirstName = req.customerFirstName;
        order.customerLastName = req.customerLastName;
        order.customerAddress = req.customerAddress;
        order.totalPrice = laptop.price;
        order.laptop = laptop;

        order.persist();

        return order;
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public ShopOrder update(@PathParam("id") Long id, UpdateShopOrderRequest req) {

        ShopOrder order = ShopOrder.findById(id);
        if (order == null) {
            throw new WebApplicationException("Order not found", 404);
        }

        order.customerFirstName = req.customerFirstName;
        order.customerLastName = req.customerLastName;
        order.customerAddress = req.customerAddress;

        if (req.laptopId != null) {
            Laptop laptop = Laptop.findById(req.laptopId);
            if (laptop == null) {
                throw new WebApplicationException("Laptop not found", 404);
            }
            order.laptop = laptop;
            order.totalPrice = laptop.price;
        }

        return order;
    }
}
