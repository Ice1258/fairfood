package ch.fairfood.backend.exception;

public class ProductNotFoundException extends RuntimeException {

    public ProductNotFoundException(Long id) {
        super("Produkt mit ID " + id + " nicht gefunden");
    }
}
