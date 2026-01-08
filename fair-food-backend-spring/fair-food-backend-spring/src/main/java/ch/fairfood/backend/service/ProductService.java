package ch.fairfood.backend.service;

import ch.fairfood.backend.model.Product;

import java.util.List;

public interface ProductService {

    List<Product> getAll();

    Product getById(Long id);

    Product create(Product product);

    Product update(Long id, Product update);

    void delete(Long id);
}
