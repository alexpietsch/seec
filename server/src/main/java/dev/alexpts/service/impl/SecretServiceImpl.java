package dev.alexpts.service.impl;

import dev.alexpts.mapper.SecretMapper;
import dev.alexpts.persistence.SecretRepository;
import dev.alexpts.persistence.model.Secret;
import dev.alexpts.problem.problems.SecretNotFoundProblem;
import dev.alexpts.seec.model.NewSecretRequest;
import dev.alexpts.service.SecretService;
import org.apache.commons.lang3.RandomStringUtils;
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class SecretServiceImpl implements SecretService {

    private final SecretRepository secretRepository;

    @Autowired
    public SecretServiceImpl(SecretRepository secretRepository) {
        this.secretRepository = secretRepository;
    }

    @Override
    public String saveSecret(NewSecretRequest newSecretRequest) {
        Secret newSecret = Mappers.getMapper(SecretMapper.class).fromNewSecretRequest(newSecretRequest);

        newSecret.setSecretReadableId(generateSecretId());
        Secret createdSecret = secretRepository.save(newSecret);

        return createdSecret.getSecretReadableId();
    }

    @Override
    public Secret getSecret(String secretReadableId) {
        return secretRepository.findSecretBySecretReadableId(secretReadableId)
                .orElseThrow(() -> new SecretNotFoundProblem(secretReadableId));
    }

    @Override
    public Secret getSecret(UUID secretId) {
        return secretRepository.findSecretById(secretId)
                .orElseThrow(() -> new SecretNotFoundProblem(secretId.toString()));
    }

    private String generateSecretId() {
        String newSecretReadableId;

        do {
            newSecretReadableId = RandomStringUtils.random(22, true, true);
        } while (secretRepository.existsSecretBySecretReadableId(newSecretReadableId));

        return newSecretReadableId;
    }
}
