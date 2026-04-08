package com.example;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import java.util.List;

@Path("/api/laptops")
@Produces(MediaType.APPLICATION_JSON)
public class LaptopResource {

    @GET
    public List<Laptop> getAll() {
        return Laptop.listAll();
    }
}
