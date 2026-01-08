package ch.fairfood.backend.controller;

import ch.fairfood.backend.model.Product;
import ch.fairfood.backend.repository.ProductRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {

    private final ProductRepository repo;

    public ProductController(ProductRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Product> getAll() throws Exception {
        var result =  repo.findAll();

            if(result.isEmpty()) {
                throw new Exception("Oh no result is empty");
            }

            return result;

    }
}
