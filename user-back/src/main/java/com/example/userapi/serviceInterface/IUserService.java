package com.example.userapi.serviceInterface;

import com.example.userapi.dto.UserDto;

import java.util.List;

public interface IUserService {

    List<UserDto> getUsers();

    UserDto getUser(long id);

    UserDto addNewUser(UserDto userDto);

    UserDto updateUser(Long userId, UserDto userDto) throws Exception;

    void deleteUser(Long userId) throws Exception;
}