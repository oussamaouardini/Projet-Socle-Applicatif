package com.example.demo.user.controller;


import com.example.demo.user.entity.User;
import com.example.demo.user.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/users")
@CrossOrigin("http://localhost:3000/")
@Slf4j
public class UserController {
    @Autowired
    UserRepository userRepository;
    @GetMapping
    public List<User> getAllUsers(){
        List<User> users;
        users = userRepository.findAll();
        return users;
    }

    @PostMapping
    public User AddUser(@RequestBody User user){
        log.info("Trying to add user");
        try {
            userRepository.save(user);
        }catch (Exception e){
            log.error(e.toString());
        }
        log.info("User added Successfully");
        return user;
    }

    @DeleteMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void deleteUser(@PathVariable("id") Integer id){
        log.info("Trying to delete user");
        try {
            userRepository.deleteById(id);
        }catch (Exception e){
            log.error(e.toString());
        }
        log.info("User deleted Successfully");
    }

}
