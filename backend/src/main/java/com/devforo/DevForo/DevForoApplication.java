package com.devforo.DevForo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.devforo")
public class DevForoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DevForoApplication.class, args);
	}

}
