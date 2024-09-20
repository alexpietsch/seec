package dev.alexpts.persistence.model;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;
import java.util.UUID;

@Entity
@NoArgsConstructor
@Getter
@Setter
@Table(name = "secret", schema = "seec")
public class Secret {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String secretReadableId;

    private String secret;

    private String iv;

    private Instant autoExpireAt;

    @CreationTimestamp
    private Instant createdAt;
}
