package com.example;

import io.quarkus.runtime.StartupEvent;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.event.Observes;
import jakarta.transaction.Transactional;

@ApplicationScoped
public class LaptopDataLoader {

    @Transactional
    void onStart(@Observes StartupEvent ev) {
        if (Laptop.count() > 0) {
            return;
        }

        Laptop l1 = new Laptop();
        l1.brand = "Apple";
        l1.model = "MacBook Air M3";
        l1.price = 1499.0;
        l1.persist();

        Laptop l2 = new Laptop();
        l2.brand = "Lenovo";
        l2.model = "ThinkPad X1 Carbon";
        l2.price = 1799.0;
        l2.persist();

        Laptop l3 = new Laptop();
        l3.brand = "Dell";
        l3.model = "XPS 13";
        l3.price = 1599.0;
        l3.persist();

        Laptop l4 = new Laptop();
        l4.brand = "HP";
        l4.model = "Spectre x360";
        l4.price = 1399.0;
        l4.persist();

        Laptop l5 = new Laptop();
        l5.brand = "ASUS";
        l5.model = "Zenbook 14";
        l5.price = 1299.0;
        l5.persist();
    }
}
