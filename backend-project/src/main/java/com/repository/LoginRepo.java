package com.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.model.Login;


@Repository
public interface LoginRepo extends JpaRepository<Login, Integer> {

	Optional<Login> findByName(String username);
	
	

}
