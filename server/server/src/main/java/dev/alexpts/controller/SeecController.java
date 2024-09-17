package dev.alexpts.controller;

import dev.alexpts.persistence.model.Secret;
import dev.alexpts.seec.api.SeecApi;
import dev.alexpts.seec.model.GetSecretResponse;
import dev.alexpts.seec.model.NewSecretRequest;
import dev.alexpts.seec.model.NewSecretResponse;
import dev.alexpts.service.SecretService;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import java.time.ZoneOffset;

@CrossOrigin
@RestController
@RequiredArgsConstructor
public class SeecController implements SeecApi {

    private final SecretService secretService;

    @Override
    public ResponseEntity<NewSecretResponse> saveSecret(NewSecretRequest newSecretRequest) {
        Secret newSecret = new Secret();
        newSecret.setSecret(newSecretRequest.getSecret());
        newSecret.setIv(newSecretRequest.getIv());
        if (ObjectUtils.isNotEmpty(newSecretRequest.getAutoExpire())) {
            newSecret.setAutoExpireAt(newSecretRequest.getAutoExpire().toInstant());
        }

        var createdSecretId = secretService.saveSecret(newSecret);

        return ResponseEntity.ok(new NewSecretResponse().id(createdSecretId));
    }

    @Override
    public ResponseEntity<GetSecretResponse> getSecret(String secretId) {
        var secret = secretService.getSecret(secretId);
        var res = new GetSecretResponse().secret(secret.getSecret()).iv(secret.getIv()).autoExpire(ObjectUtils.isNotEmpty(secret.getAutoExpireAt()) ? secret.getAutoExpireAt().atOffset(ZoneOffset.UTC) : null);
        return ResponseEntity.ok(res);
    }
}
