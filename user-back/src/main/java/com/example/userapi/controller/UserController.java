package com.example.userapi.controller;

import com.example.userapi.dto.UserDto;
import com.example.userapi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.graphql.data.method.annotation.QueryMapping;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/users")
@CrossOrigin(origins = "*")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<UserDto>> findAllUsers() {
        return new ResponseEntity<>(userService.getUsers(), HttpStatus.OK);
    }

    @GetMapping(path = "/{userId}")
    public ResponseEntity<UserDto> findUserById(@PathVariable long userId) throws Exception {
        return new ResponseEntity<>(userService.getUser(userId), HttpStatus.OK);
    }


    @PostMapping
    public ResponseEntity<UserDto> addNewUser(@RequestBody UserDto userDto) {
        return new ResponseEntity<>(userService.addNewUser(userDto), HttpStatus.CREATED);
    }

    @DeleteMapping(path = "/{userId}")
    public void deleteUser(@PathVariable("userId") Long userId) throws Exception {
        userService.deleteUser(userId);
    }

    @PutMapping(path = "/{userId}")
    public ResponseEntity<UserDto> updateUser(@PathVariable Long userId, @RequestBody UserDto userDto) throws Exception {
        return new ResponseEntity<>(userService.updateUser(userId, userDto), HttpStatus.OK);
    }

    @QueryMapping
    public List<UserDto> getAllUserQuery() {
        return userService.getUsers();
    }

    @MutationMapping
    public UserDto createUser(@Argument(value = "user") UserDto userDto) {
        return userService.addNewUser(userDto);
    }

    @MutationMapping
    public UserDto updateUser(@Argument long userId, @Argument(value = "user") UserDto userDto) throws Exception {
        return userService.updateUser(userId, userDto);
    }

    @MutationMapping
    public void deleteUser(@Argument long userId) throws Exception {
        userService.deleteUser(userId);
    }

}
