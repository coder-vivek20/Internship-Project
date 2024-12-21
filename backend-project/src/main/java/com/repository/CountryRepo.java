package com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.model.Country;

@Repository
public interface CountryRepo extends JpaRepository<Country, Long> {

}
