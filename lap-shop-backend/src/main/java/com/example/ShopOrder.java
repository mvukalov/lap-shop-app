package com.example;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;

@Entity
public class ShopOrder extends PanacheEntity {

    public String customerFirstName;
    public String customerLastName;

    public Double totalPrice;

    @ManyToOne
    public Laptop laptop;
}
