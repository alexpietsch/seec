package dev.alexpts.service;

import dev.alexpts.persistence.model.Secret;

import java.util.UUID;

public interface SecretService {
    String saveSecret(Secret secret);

    Secret getSecret(String secretId);

    Secret getSecret(UUID secretId);
}
