package dev.alexpts.problem;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ProblemErrorCodes {
    GENERIC_INTERNAL_SERVER_ERROR(1000),
    RESOURCE_NOT_FOUND(1001),
    SECRET_NOT_FOUND(2000);

    private final int errorCode;
}
