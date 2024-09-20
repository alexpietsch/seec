package dev.alexpts;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication/*(exclude = ErrorMvcAutoConfiguration.class)*/
//@EnableAutoConfiguration()
public class SeecApplication {
    public static void main(String[] args) {
        SpringApplication.run(SeecApplication.class, args);
    }
}