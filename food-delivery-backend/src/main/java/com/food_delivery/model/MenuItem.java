package com.food_delivery.model;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "menu_items")
public class MenuItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(nullable = false)
    private double price;

    private String imageName;
    private String imageType;

    @Lob
    @Column(columnDefinition = "BYTEA") // ✅ Changed from LONGBLOB to BYTEA
    private byte[] imageData;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;
}
