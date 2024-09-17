package dev.alexpts.problem;

import org.zalando.problem.AbstractThrowableProblem;
import org.zalando.problem.StatusType;

import java.net.URI;
import java.util.HashMap;
import java.util.Map;

public class DefaultThrowableProblem extends AbstractThrowableProblem {

    static final URI TYPE = URI.create("https://api.alexpts.dev/problem");
    final private String errorCode;

    public DefaultThrowableProblem(
            String errorCode,
            StatusType status,
            String title,
            String detail
    ) {
        super(TYPE, title, status, detail);
        this.errorCode = errorCode;
    }


    protected DefaultThrowableProblem(
            ProblemErrorCodes errorCode,
            StatusType status,
            String title,
            String detail
    ) {
        this(errorCode.getErrorCode(), status, title, detail);
    }

    @Override
    public Map<String, Object> getParameters() {
        Map<String, Object> parameters = new HashMap<>(super.getParameters());
        parameters.put("errorCode", this.errorCode);
        return parameters;
    }
}
