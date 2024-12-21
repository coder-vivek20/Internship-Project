package com.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.model.City;

@Repository
public interface CityRepo extends JpaRepository<City, Long>{

	List<City> findByStateId(Long id);

}
