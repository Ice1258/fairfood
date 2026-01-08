import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function ProductModal({ product, onClose }) {
    if (!product) return null;

    return (
        <Modal show onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>{product.name}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p><strong>Marke:</strong> {product.brand}</p>
                <p><strong>Preis:</strong> CHF {product.price.toFixed(2)}</p>
                <p><strong>Distanz:</strong> {product.distance} km</p>
                <p><strong>Herkunft:</strong> {product.origin}</p>
                <p><strong>Haltbarkeit:</strong> {product.expiryDays} Tage</p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Schließen
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
