package com.web.movie;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MovieApplication {

	public static void main(String[] args) {
		SpringApplication.run(MovieApplication.class, args);
		System.out.println(args.length);
		for(String tmp: args){
			System.out.println("Herereeeeeeeeeeeeeeeeeeeeee: "+tmp);
		}
	}

}
