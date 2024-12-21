package com.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.model.Login;
import com.service.UserService;
import com.util.JwtUtil;


@RestController
@RequestMapping("/login")
@CrossOrigin(origins = "http://localhost:3000")
public class loginController {

	@Autowired
    private UserService service;
	@Autowired
    private JwtUtil jwtUtil; 
	
	
	@PostMapping("/check")
	public ResponseEntity<String> loginCheck(@RequestBody Login login) {
	    System.out.println("landed on controller");

	    if (login == null || login.getName() == null || login.getPassword() == null) {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid login data");
	    }

	    String validationStatus = service.validateUser(login.getName(), login.getPassword());

	    if ("success".equals(validationStatus)) {
	        String token = jwtUtil.generateToken(login.getName());
	        System.out.println("Generated Token: " + token);
	        return ResponseEntity.ok("Bearer " + token);
	    } else {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
	    }
	}



	
	
	@PostMapping("/loginsave")
	public ResponseEntity<String> loginSave(@RequestBody Login login) {
		System.out.println("landed on controller");
		System.out.println(login.getPassword());
	    try {
	        service.LoginSave(login);
	        return ResponseEntity.ok("Registration successful");
	    } catch (Exception e) {
	        e.printStackTrace(); 
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error during registration");
	    }
	}
}
