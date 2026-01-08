package ch.fairfood.backend;

import ch.fairfood.backend.model.Product;
import ch.fairfood.backend.service.ProductService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class FairFoodApplicationTests {

    @Autowired
    private ProductService productService;

    @Test
    void contextLoads() {
    }

    @Test
    void seededProductsAreAvailable() {
        List<Product> products = productService.getAll();
        assertThat(products).isNotEmpty();
    }
}
