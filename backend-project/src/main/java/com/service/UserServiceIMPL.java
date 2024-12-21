package com.service;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.model.City;
import com.model.Country;
import com.model.Employee;
import com.model.Login;
import com.model.State;
import com.model.User;
import com.repository.CityRepo;
import com.repository.CountryRepo;
import com.repository.EmpRepo;
import com.repository.LoginRepo;
import com.repository.StateRepo;
import com.repository.UserRepo;

@Service
public class UserServiceIMPL implements UserService {
	
	
	
	private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceIMPL(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }
	  
	@Autowired
	private UserRepo repo;
	
	@Autowired
	private CountryRepo repo1;
	
	@Autowired
	private StateRepo repo2;
	
	@Autowired
	private CityRepo repo3;
	
	@Autowired
	private LoginRepo repo4;
	
	@Autowired
	private EmpRepo repo5;

	@Override
	public void saveUser(User user) {
		repo.save(user);
		

		
	}
	

	
	@Transactional
	public String deleteUser(Long id) {
	    Optional<User> existingUserOptional = repo.findById(id);

	    if (existingUserOptional.isPresent()) {
	        repo.deleteById(id);
	        return "User deleted successfully!";
	    } else {
	        throw new IllegalArgumentException("User not found.");
	    }
	}


	public List<User> getAllUsers() {
	    // Debug and log the result
	    List<User> users = repo.findAll();
	    System.out.println("Users fetched: " + users);
	    return users;
	}

	   public User findUserById(Long id) {
	        Optional<User> user = repo.findById(id);
	        return user.orElse(null); 
	    }

	   @Override
	   public void updateUser(Long id, User user) {
	       Optional<User> existingUserOpt = repo.findById(id);
	       if (existingUserOpt.isPresent()) {
	           User existingUser = existingUserOpt.get();
	           existingUser.setFirstName(user.getFirstName());
	           existingUser.setLastName(user.getLastName());
	           existingUser.setCurrentAddress(user.getCurrentAddress());
	           existingUser.setPermanentAddress(user.getPermanentAddress());
	           existingUser.setEducationYear(user.getEducationYear());
	           existingUser.setGender(user.getGender());
	           existingUser.setCountry(user.getCountry());
	           existingUser.setState(user.getState());
	           existingUser.setCity(user.getCity());
	           if (user.getImage() != null) {
	               existingUser.setImage(user.getImage());
	           }
	           repo.save(existingUser);
	       } else {
	           throw new RuntimeException("User not found.");
	       }
	   }


	@Override
	public List<Country> getAllCountries() {
		
		return repo1.findAll();
	}


	@Override
	public List<State> getStatesByCountryId(Long id) {
		 return repo2.findByCountryId(id);
	}


	@Override
	public List<City> getCityByStateId(Long id) {
		
		return repo3.findByStateId(id);
		

	}



	@Override
	public String LoginSave(Login login) {
		
		System.out.println("landed on service method ");
	    if (login == null || login.getPassword() == null) {
	        System.out.println("login object or password is null");
	    }
	    login.setPassword(passwordEncoder.encode(login.getPassword()));
	    repo4.save(login); 
	    return "successful";
	}





	@Override
	public String validateUser(String username, String password) {
	  
	    Optional<Login> userOpt = repo4.findByName(username);
	    
	    if (!userOpt.isPresent()) {
	        System.out.println("User not found with username: " + username);
	        return "Invalid username or password";
	    }

	   
	    Login user = userOpt.get();
	    System.out.println("Fetched user from database: " + user);

	   
	    boolean isPasswordMatch = passwordEncoder.matches(password, user.getPassword());
	    System.out.println("Debug: Password provided: " + password);
	    System.out.println("Debug: Hashed password from DB: " + user.getPassword());
	    System.out.println("Debug: Password match status: " + isPasswordMatch);

	    if (isPasswordMatch) {
	        return "success";
	    } else {
	        return "Invalid username or password";
	    }
	}



	@Override
	public void saveEmployee(Employee employee) {
		
		repo5.save(employee);
		
	}



	@Override
	public void deleteEmployeeById(Long id) {
		
            repo5.deleteById(id);
       
    }



	@Override
	public List<Employee> getAllEmployees() {
		 return repo5.findAll();
	}



	@Override
	public Employee updateEmployee(Long id, Employee employeeDetails) {
		Optional<Employee> optionalEmployee = repo5.findById(id);

        if (optionalEmployee.isPresent()) {
            Employee emp = optionalEmployee.get();

            // Update the fields
            emp.setFullName(employeeDetails.getFullName());
            emp.setQualification(employeeDetails.getQualification());
            emp.setJoiningDate(employeeDetails.getJoiningDate());
            emp.setDesignation(employeeDetails.getDesignation());
            emp.setSalary(employeeDetails.getSalary());
            emp.setAddress(employeeDetails.getAddress());
            emp.setGender(employeeDetails.getGender());
           
            return repo5.save(emp);
        } else {
            System.out.println("employee not found");
        }
		return employeeDetails;
	}



	@Override
	public Optional<Employee> getEmployeeById(Long id) {
		 return repo5.findById(id);
	}
	
	


}
	

	
		
	

	

