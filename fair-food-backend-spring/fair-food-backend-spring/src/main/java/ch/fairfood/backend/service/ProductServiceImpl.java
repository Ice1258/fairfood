package ch.fairfood.backend.service;

import ch.fairfood.backend.exception.ProductNotFoundException;
import ch.fairfood.backend.model.Product;
import ch.fairfood.backend.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository repository;

    public ProductServiceImpl(ProductRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<Product> getAll() {
        try {
            List<Product> products = repository.findAll();

            if (products.isEmpty()) {
                throw new ProductNotFoundException(-1L);
            }

            return products;

        } catch (ProductNotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException("Fehler beim Laden der Produkte", e);
        } finally {
            System.out.println("getAll() ausgeführt");
        }
    }

    @Override
    public Product getById(Long id) {
        try {
            return repository.findById(id)
                    .orElseThrow(() -> new ProductNotFoundException(id));
        } finally {
            System.out.println("getById() ausgeführt");
        }
    }

    @Override
    public Product create(Product product) {
        return repository.save(product);
    }

    @Override
    public Product update(Long id, Product update) {
        Product existing = getById(id);
        existing.setName(update.getName());
        existing.setPrice(update.getPrice());
        return repository.save(existing);
    }

    @Override
    public void delete(Long id) {
        Product product = getById(id);
        repository.delete(product);
    }
}
