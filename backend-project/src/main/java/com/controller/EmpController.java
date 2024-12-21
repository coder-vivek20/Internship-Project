package com.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.model.Employee;
import com.service.UserService;

@RestController
@RequestMapping("/emp")
public class EmpController {
	
	@Autowired
    private UserService service;

	 @PostMapping("/save")
	    public ResponseEntity<String> saveEmployee(@RequestBody Employee employee) {
	        try {
	        	System.out.println("landed on save employee controller");
	            service.saveEmployee(employee);
	            return new ResponseEntity<>("Employee saved successfully!", HttpStatus.CREATED);
	        } catch (Exception e) {
	            return new ResponseEntity<>("Failed to save employee: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
	        }
	    }
	 
	 @DeleteMapping("/delete/{id}")
	    public ResponseEntity<String> deleteEmployee(@PathVariable Long id) {
	        try {
	            service.deleteEmployeeById(id);
	            return new ResponseEntity<>("Employee deleted successfully!", HttpStatus.OK);
	        } catch (Exception e) {
	            return new ResponseEntity<>("Failed to delete employee: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
	        }
	    }
	 
	 @GetMapping("/all")
	    public ResponseEntity<List<Employee>> getAllEmployees() {
	        try {
	            List<Employee> employees = service.getAllEmployees();
	            return new ResponseEntity<>(employees, HttpStatus.OK);
	        } catch (Exception e) {
	            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	        }
	    }
	 @PutMapping("/update/{id}")
	    public ResponseEntity<String> updateEmployee(@PathVariable Long id, @RequestBody Employee employeeDetails) {
	        try {
	            Employee updatedEmployee = service.updateEmployee(id, employeeDetails);
	            return ResponseEntity.ok("Employee updated successfully: " + updatedEmployee.toString());
	        } catch (Exception e) {
	            return ResponseEntity.badRequest().body("Error updating employee: " + e.getMessage());
	        }
	    }
	 @GetMapping("/{id}")
	    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
	        Optional<Employee> employee = service.getEmployeeById(id);
	        return employee.map(ResponseEntity::ok)
	                       .orElse(ResponseEntity.notFound().build());
	    }
}
