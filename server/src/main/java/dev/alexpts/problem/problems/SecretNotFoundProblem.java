package dev.alexpts.problem.problems;

import dev.alexpts.problem.DefaultThrowableProblem;
import dev.alexpts.problem.ProblemErrorCodes;
import org.springframework.data.annotation.Immutable;
import org.zalando.problem.Status;

@Immutable
public final class SecretNotFoundProblem extends DefaultThrowableProblem {

    private static final String ERROR_MESSAGE = "Secret with id %s was not found";

    public SecretNotFoundProblem(String secretId) {
        super(
                ProblemErrorCodes.SECRET_NOT_FOUND,
                Status.NOT_FOUND,
                "SECRET_NOT_FOUND",
                String.format(ERROR_MESSAGE, secretId)
        );
    }
}
