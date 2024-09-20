package dev.alexpts.persistence;

import dev.alexpts.persistence.model.Secret;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;
import java.util.UUID;

public interface SecretRepository extends CrudRepository<Secret, UUID> {
    boolean existsSecretBySecretReadableId(String newSecretId);

    Optional<Secret> findSecretBySecretReadableId(String secretReadableId);

    Optional<Secret> findSecretById(UUID secretId);
}