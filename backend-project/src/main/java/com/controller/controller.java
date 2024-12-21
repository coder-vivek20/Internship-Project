package com.controller;

import com.model.City;
import com.model.Country;
import com.model.State;
import com.model.User;
import com.service.UserService;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.omg.CORBA.portable.InputStream;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;




@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000")
public class controller {

    @Autowired
    private UserService service;

    @InitBinder
    protected void initBinder(WebDataBinder binder) {
        binder.setDisallowedFields("image");
    }

    @PostMapping("/RegisterUser")
    public void addUser(@ModelAttribute User user,
                        @RequestParam("image") MultipartFile imageFile,
                        @RequestParam("countryId") Long countryId,
                        @RequestParam("stateId") Long stateId,
                        @RequestParam("cityId") Long cityId) {

        if (imageFile != null && !imageFile.isEmpty()) {
            try (java.io.InputStream inputStream = imageFile.getInputStream();
                 ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {

                byte[] buffer = new byte[1024];
                int bytesRead;
                while ((bytesRead = inputStream.read(buffer)) != -1) {
                    outputStream.write(buffer, 0, bytesRead);
                }
                user.setImage(outputStream.toByteArray());
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        // Set country, state, and city objects to the user
        Country country = new Country();
        country.setId(countryId);
        user.setCountry(country);

        State state = new State();
        state.setId(stateId);
        user.setState(state);

        City city = new City();
        city.setId(cityId);
        user.setCity(city);

        service.saveUser(user);
    }

      

       
     

    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateUser(
            @PathVariable Long id,
            @ModelAttribute User user,
            @RequestParam(value = "image", required = false) MultipartFile imageFile,
            @RequestParam(value = "countryId", required = false) Long countryId,
            @RequestParam(value = "stateId", required = false) Long stateId,
            @RequestParam(value = "cityId", required = false) Long cityId) throws IOException {
        
        	  Country country = new Country();
              country.setId(countryId);
              user.setCountry(country);

              State state = new State();
              state.setId(stateId);
              user.setState(state);

              City city = new City();
              city.setId(cityId);
              user.setCity(city);

            // Handle image upload if provided
            if (imageFile != null && !imageFile.isEmpty()) {
                user.setImage(imageFile.getBytes());
            }

            System.out.println("country id:"+countryId);
            System.out.println("state id:"+stateId);
            System.out.println("city id:"+cityId);

            service.updateUser(id, user);
            return ResponseEntity.ok("User updated successfully.");
        } 
        
    

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        try {
            String result = service.deleteUser(id);
            return ResponseEntity.ok(result);  
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete user.");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User user = service.findUserById(id);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(404).body(null);
        }
    }   
    
    @GetMapping("/")
    public ResponseEntity<List<User>> getAllUsers() {
        try {
            List<User> users = service.getAllUsers();
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @GetMapping("/countries/")
    public ResponseEntity<List<Country>> getAllCountries(){
    	try {
    		List<Country> con=service.getAllCountries();
    		System.out.println("Countries: " + con);
    		return ResponseEntity.ok(con);
    		
    	}catch(Exception e)
    	{
    		e.printStackTrace();
    	}
    	
    	
		return null;
    }
    @GetMapping("/State/{Id}")
    public List<State> getStatesByCountry(@PathVariable Long Id) {
        return service.getStatesByCountryId(Id);
    }
    
    @GetMapping("/City/{Id}")
    public List<City> getCityByState(@PathVariable Long Id){
    return service.getCityByStateId(Id);
    }
}
