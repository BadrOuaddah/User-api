package com.example.userapi.service;

import com.example.userapi.dto.UserDto;
import com.example.userapi.entity.User;
import com.example.userapi.mapper.UserMapper;
import com.example.userapi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    // TODO: Add init testing for test service layer
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Autowired
    public UserService(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    public List<UserDto> getUsers() {
        List<User> users = userRepository.findAll();
        return userMapper.toDTOs(users);
    }

    public UserDto getUser(long id) {
        Optional<User> userOptional = userRepository.findById(id);
        return userMapper.toDTO(userOptional.get());
    }

    public UserDto addNewUser(UserDto userDto) {
        User saved = userRepository.save(userMapper.toEntity(userDto));
        return userMapper.toDTO(saved);
    }

    public UserDto updateUser(Long userId, UserDto userDto) throws Exception {
        userRepository.findById(userId).orElseThrow(() -> new Exception("User not found with id : " + userId));
        userDto.setId(userId);
        User userUpdated = userRepository.save(userMapper.toEntity(userDto));
        return userMapper.toDTO(userUpdated);
    }

    public void deleteUser(Long userId) throws Exception {
        userRepository.findById(userId).orElseThrow(() -> new Exception("User not found with id : " + userId));
        userRepository.deleteById(userId);
    }

}
