package dev.alexpts.problem;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ProblemErrorCodes {
    SECRET_NOT_FOUND("1000");

    private final String errorCode;
}
