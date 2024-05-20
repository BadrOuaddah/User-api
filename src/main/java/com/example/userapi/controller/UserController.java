package com.example.userapi.controller;

import com.example.userapi.dto.UserDto;
import com.example.userapi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/users")
@CrossOrigin(origins = {"http://localhost:8081"})
public class UserController {
    // TODO: Add integration testing to test endpoint
    // TODO: Add unit testing to test controller layer
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<UserDto> findAllUsers() {
        return userService.getUsers();
    }

    @GetMapping(path = "/{userId}")
    public UserDto findUserById(@PathVariable long userId) {
        return userService.getUser(userId);
    }


    @PostMapping
    public UserDto addNewUser(@RequestBody UserDto userDto) {
        return userService.addNewUser(userDto);
    }

    @DeleteMapping(path = "/{userId}")
    public void deleteUser(@PathVariable("userId") Long userId) throws Exception {
        userService.deleteUser(userId);
    }

    @PutMapping(path = "/{userId}")
    public void updateUser(@PathVariable Long userId, @RequestBody UserDto userDto) throws Exception {
        userService.updateUser(userId, userDto);
    }

}