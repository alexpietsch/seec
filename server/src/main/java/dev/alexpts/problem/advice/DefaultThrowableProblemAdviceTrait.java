package dev.alexpts.problem.advice;

import dev.alexpts.problem.DefaultThrowableProblem;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.NativeWebRequest;
import org.zalando.problem.Problem;
import org.zalando.problem.spring.web.advice.AdviceTrait;

public interface DefaultThrowableProblemAdviceTrait extends AdviceTrait {
    String getModuleIdentifier();

    @ExceptionHandler(DefaultThrowableProblem.class)
    default ResponseEntity<Problem> handleDefaultThrowableProblem(DefaultThrowableProblem ex, NativeWebRequest req) {
        return create(ex, req);
    }
}