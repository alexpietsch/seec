package dev.alexpts.problem.problems;

import dev.alexpts.problem.DefaultThrowableProblem;
import dev.alexpts.problem.ProblemErrorCodes;
import org.springframework.data.annotation.Immutable;
import org.zalando.problem.Status;

@Immutable
public final class ServiceUnavailableProblem extends DefaultThrowableProblem {

  private static final String ERROR_MESSAGE = " Service Unavailable. Please try again later.";

  public ServiceUnavailableProblem() {
    super(
            ProblemErrorCodes.SERVICE_UNAVAILABLE,
            Status.SERVICE_UNAVAILABLE,
            "SERVICE_UNAVAILABLE",
            String.format(ERROR_MESSAGE)
    );
  }

  public ServiceUnavailableProblem(ProblemErrorCodes errorCode) {
    super(
            errorCode,
            Status.SERVICE_UNAVAILABLE,
            "SERVICE_UNAVAILABLE",
            String.format(ERROR_MESSAGE)
    );
  }
}