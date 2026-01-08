package ch.fairfood.backend.service;

import ch.fairfood.backend.exception.ProductNotFoundException;
import ch.fairfood.backend.model.Product;
import ch.fairfood.backend.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public List<Product> getAll() {
        return productRepository.findAll();
    }

    @Override
    public Product getById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException(id));
    }

    @Override
    public Product create(Product product) {
        product.setDiscount(product.getDiscount());
        return productRepository.save(product);
    }

    @Override
    public Product update(Long id, Product update) {
        Product existing = getById(id);
        existing.setName(update.getName());
        existing.setBrand(update.getBrand());
        existing.setPrice(update.getPrice());
        existing.setDistance(update.getDistance());
        existing.setOrigin(update.getOrigin());
        existing.setBio(update.isBio());
        existing.setExpiryDays(update.getExpiryDays());
        existing.setDiscount(update.getDiscount());
        return productRepository.save(existing);
    }

    @Override
    public void delete(Long id) {
        if (!productRepository.existsById(id)) {
            throw new ProductNotFoundException(id);
        }
        productRepository.deleteById(id);
    }
}
