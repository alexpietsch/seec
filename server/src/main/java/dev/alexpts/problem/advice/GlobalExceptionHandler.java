package dev.alexpts.problem.advice;

import dev.alexpts.problem.ProblemErrorCodes;
import dev.alexpts.seec.model.DefaultErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.resource.NoResourceFoundException;

@ControllerAdvice
public class GlobalExceptionHandler implements DefaultThrowableProblemAdviceTrait  {

    @Override
    public String getModuleIdentifier() {
        return "Global";
    }

    @ExceptionHandler(NoResourceFoundException.class)
    @ResponseStatus(value = HttpStatus.NOT_FOUND)
    @ResponseBody
    public ResponseEntity<DefaultErrorResponse> noResourceFoundExceptionHandler() {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                new DefaultErrorResponse()
                        .httpCode(404)
                        .errorMessage("Resource not found")
                        .errorCode(ProblemErrorCodes.RESOURCE_NOT_FOUND.getErrorCode()));
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
    public ResponseEntity<DefaultErrorResponse> otherExceptions(Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                new DefaultErrorResponse()
                        .httpCode(500)
                        .errorMessage("Internal server error")
                        .errorCode(ProblemErrorCodes.GENERIC_INTERNAL_SERVER_ERROR.getErrorCode()));
    }
}
