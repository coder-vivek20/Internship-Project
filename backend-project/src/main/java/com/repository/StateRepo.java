package com.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.model.State;

@Repository
public interface StateRepo extends JpaRepository<State, Long> {

	List<State> findByCountryId(Long id);

}
