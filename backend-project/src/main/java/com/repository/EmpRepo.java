package com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



import com.model.Employee;

@Repository
public interface EmpRepo extends JpaRepository<Employee, Long>{

	
	
	

}
