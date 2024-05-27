package com.example.userapi.unitTesting;

import com.example.userapi.controller.UserController;
import com.example.userapi.dto.UserDto;
import com.example.userapi.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Arrays;
import java.util.List;
import java.util.Objects;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
public class UserControllerTest {

    @Mock
    private UserService userService;

    @InjectMocks
    private UserController userController;

    @Autowired
    private ObjectMapper objectMapper;
    @Autowired
    private MockMvc mockMvc;

    @BeforeEach
    public void init() {
        mockMvc = MockMvcBuilders.standaloneSetup(userController).build();
        objectMapper = new ObjectMapper();
    }

    @Test
    public void getUserTest() throws Exception {
        Long userId = 1L;
        UserDto userDto = new UserDto();

        when(userService.getUser(userId)).thenReturn(userDto);
        ResponseEntity<UserDto> response = userController.findUserById(userId);
        assertNotNull(response);

        userService.getUser(userId);
        mockMvc.perform(get("/api/v1/users/{userId}", userId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(userDto)))
                .andExpect(status().isOk());
    }

    @Test
    public void getAllUsersTest() throws Exception {
        List<UserDto> userDtoList = Arrays.asList(
                new UserDto(),
                new UserDto()
        );

        when(userService.getUsers()).thenReturn(userDtoList);
        ResponseEntity<List<UserDto>> result = userController.findAllUsers();
        verify(userService, times(1)).getUsers();
        assertEquals(2, Objects.requireNonNull(result.getBody()).size());

        mockMvc.perform(get("/api/v1/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(userDtoList)))
                .andExpect(status().isOk());
    }

    @Test
    public void addUserTest() throws Exception {
        UserDto userDto = new UserDto();

        when(userService.addNewUser(userDto)).thenReturn(userDto);
        UserDto userAdded = userController.addNewUser(userDto).getBody();

        verify(userService, times(1)).addNewUser(userDto);
        assertNotNull(userAdded);

        mockMvc.perform(post("/api/v1/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(userDto)))
                .andExpect(status().isCreated());

    }

    @Test
    public void updateUserTest() throws Exception {
        Long userId = 1L;
        UserDto userDto = new UserDto();
        when(userService.updateUser(userId, userDto)).thenReturn(userDto);

        ResponseEntity<UserDto> response = userController.updateUser(userId, userDto);
        assertNotNull(response);

        verify(userService, times(1)).updateUser(userId, userDto);

        mockMvc.perform(put("/api/v1/users/{userId}", userId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(userDto)))
                .andExpect(status().isOk());
    }

    @Test
    public void deleteUserTest() throws Exception {
        Long userId = 1L;

        doNothing().when(userService).deleteUser(userId);

        userController.deleteUser(userId);
        verify(userService, times(1)).deleteUser(userId);

        mockMvc.perform(delete("/api/v1/users/{userId}", userId)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }
}
