package com.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.model.City;
import com.model.Country;
import com.model.Employee;
import com.model.Login;
import com.model.State;
import com.model.User;


public interface UserService {

	void saveUser(User user);


	String deleteUser(Long id);

	List<User> getAllUsers();


	void updateUser(Long id, User user);


	User findUserById(Long id);


	List<Country> getAllCountries();


	List<State> getStatesByCountryId(Long id);


	List<City> getCityByStateId(Long id);


	String LoginSave(Login login);


	String validateUser(String username, String password);


	void saveEmployee(Employee employee);


	void deleteEmployeeById(Long id);


	List<Employee> getAllEmployees();


	Employee updateEmployee(Long id, Employee employeeDetails);


	Optional<Employee> getEmployeeById(Long id);

	

}
