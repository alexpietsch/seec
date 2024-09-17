package dev.alexpts.problem.advice;//package dev.alexpts.problem.advice;
//
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.web.bind.annotation.ControllerAdvice;
//
//@ControllerAdvice
//public class GlobalExceptionHandler implements DefaultThrowableProblemAdviceTrait {
//    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);
//    @Override
//    public String getModuleIdentifier() {
//        return "global";
//    }
//}

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.NoHandlerFoundException;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(NoHandlerFoundException.class)
    public ResponseEntity<String> handleNoHandlerFoundException(NoHandlerFoundException ex) {
        return new ResponseEntity<>("Path not found", HttpStatus.NOT_FOUND);
    }

    // Add other exception handlers if needed
}