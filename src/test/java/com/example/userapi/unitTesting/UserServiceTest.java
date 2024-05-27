package com.example.userapi.unitTesting;

import com.example.userapi.dto.UserDto;
import com.example.userapi.entity.User;
import com.example.userapi.mapper.UserMapper;
import com.example.userapi.repository.UserRepository;
import com.example.userapi.service.UserService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private UserMapper userMapper;

    @InjectMocks
    private UserService userService;

    @Test
    public void getUserTest() throws Exception {
        long userId = 1L;
        User user = new User();
        UserDto userDto = new UserDto();

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(userMapper.map(user)).thenReturn(userDto);

        UserDto result = userService.getUser(userId);

        verify(userRepository, times(1)).findById(userId);
        verify(userMapper, times(1)).map(user);

        assertNotNull(result);

    }

    @Test
    public void getAllUsers() {
        List<User> users = new ArrayList<>();
        List<UserDto> userDtos = new ArrayList<>();

        when(userRepository.findAll()).thenReturn(users);
        when(userMapper.toDTOs(users)).thenReturn(userDtos);

        List<UserDto> result = userService.getUsers();

        assertEquals(users.size(), result.size());
        verify(userRepository, times(1)).findAll();
        verify(userMapper, times(1)).toDTOs(users);

    }

    @Test
    public void addUserTest() {
        UserDto userDto = new UserDto();
        User user = new User();

        when(userMapper.map(user)).thenReturn(userDto);
        when(userMapper.map(userDto)).thenReturn(user);
        when(userRepository.save(user)).thenReturn(user);

        UserDto result = userService.addNewUser(userDto);

        assertNotNull(result);
        verify(userRepository, times(1)).save(user);
        verify(userMapper, times(1)).map(userDto);
        verify(userMapper, times(1)).map(user);

    }

    @Test
    public void deleteUserTest() throws Exception {
        Long userId = 1L;
        User user = new User();

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        userService.deleteUser(userId);

        verify(userRepository, times(1)).findById(userId);
        verify(userRepository, times(1)).deleteById(userId);

    }

    @Test
    public void deleteUserIfIdNotFound() {
        Long userId = 1L;

        when(userRepository.findById(userId)).thenReturn(Optional.empty());
        Exception exception = assertThrows(Exception.class, () -> userService.deleteUser(userId));

        assertEquals("User not found with id : 1", exception.getMessage());
    }
}
