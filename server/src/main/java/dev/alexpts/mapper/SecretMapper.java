package dev.alexpts.mapper;

import dev.alexpts.persistence.model.Secret;
import dev.alexpts.seec.model.GetSecretResponse;
import dev.alexpts.seec.model.NewSecretRequest;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.time.ZoneOffset;

@Mapper(imports = {ZoneOffset.class})
public interface SecretMapper {

    @Mapping(target = "autoExpireAt", expression = "java(newSecretRequest.getAutoExpireAt().toInstant())")
    Secret fromNewSecretRequest (NewSecretRequest newSecretRequest);

    @Mapping(target = "autoExpire", expression = "java(secret.getAutoExpireAt().atOffset(ZoneOffset.UTC))")
    GetSecretResponse toGetSecretResponse(Secret secret);
}
