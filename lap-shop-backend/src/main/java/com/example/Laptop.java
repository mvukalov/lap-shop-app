package com.example;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;

@Entity
public class Laptop extends PanacheEntity {
    public String brand;
    public String model;
    public Double price;
}
