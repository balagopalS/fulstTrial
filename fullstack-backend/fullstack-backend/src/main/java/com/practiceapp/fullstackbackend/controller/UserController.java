package com.practiceapp.fullstackbackend.controller;

import com.practiceapp.fullstackbackend.exception.UserNotFoundException;
import com.practiceapp.fullstackbackend.model.User;
import com.practiceapp.fullstackbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/addUser")
    User newUser(@RequestBody User newUser){
        System.out.println("User added");
        return userRepository.save(newUser);
    }

    @GetMapping("/users")
    List<User> getAllUsers(){
        System.out.println("Listing all users");
        return userRepository.findAll();
    }

    @GetMapping("/user/{id}")
    User getUserById(@PathVariable Long id){
        System.out.println("Finding user with id "+id);
        return userRepository.findById(id)
                .orElseThrow(()->new UserNotFoundException(id));
    }

    @PutMapping("/userUpdate/{id}")
    User updateUser(@RequestBody User newUser, @PathVariable Long id){
        System.out.println("Editing User with id "+ id);
        return userRepository.findById(id)
                .map(user -> {
                    user.setUsername(newUser.getUsername());
                    user.setName(newUser.getName());
                    user.setEmail(newUser.getEmail());
                    return userRepository.save(user);
                }).orElseThrow(()->new UserNotFoundException(id));

    }

    @DeleteMapping("/deleteUser/{id}")
    String deleteUser(@PathVariable Long id){
        System.out.println("Deleting User");
        if (!userRepository.existsById(id)){
                throw new UserNotFoundException(id);}
        userRepository.deleteById(id);
        return "User with id "+id+" has been deleted";


    }
}
