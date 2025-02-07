package com.food_delivery.model;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "categories")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    private String imageName;
    private String imageType;

    @Lob
    @Column(columnDefinition = "BYTEA") // Changed from LONGBLOB to BYTEA
    private byte[] imageData;
}
