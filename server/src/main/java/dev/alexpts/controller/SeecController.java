package dev.alexpts.controller;

import dev.alexpts.mapper.SecretMapper;
import dev.alexpts.seec.api.SeecApi;
import dev.alexpts.seec.model.GetSecretResponse;
import dev.alexpts.seec.model.NewSecretRequest;
import dev.alexpts.seec.model.NewSecretResponse;
import dev.alexpts.service.SecretService;
import lombok.RequiredArgsConstructor;
import org.mapstruct.factory.Mappers;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequiredArgsConstructor
public class SeecController implements SeecApi {

    private final SecretService secretService;

    @Override
    public ResponseEntity<NewSecretResponse> saveSecret(NewSecretRequest newSecretRequest) {
        var createdSecretId = secretService.saveSecret(newSecretRequest);

        return ResponseEntity.ok(new NewSecretResponse().id(createdSecretId));
    }

    @Override
    public ResponseEntity<GetSecretResponse> getSecret(String secretId) {
        var secret = secretService.getSecret(secretId);

        var response = Mappers.getMapper(SecretMapper.class).toGetSecretResponse(secret);
        return ResponseEntity.ok(response);
    }
}
