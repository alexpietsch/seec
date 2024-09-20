package dev.alexpts.service;

import dev.alexpts.persistence.model.Secret;
import dev.alexpts.seec.model.NewSecretRequest;

import java.util.UUID;

public interface SecretService {
    String saveSecret(NewSecretRequest newSecretRequest);

    Secret getSecret(String secretId);

    Secret getSecret(UUID secretId);
}
