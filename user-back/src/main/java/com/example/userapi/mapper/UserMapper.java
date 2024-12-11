package com.example.userapi.mapper;

import com.example.userapi.dto.UserDto;
import com.example.userapi.entity.User;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserDto map(User user);

    User map(UserDto dto);

    List<UserDto> toDTOs(List<User> userList);
}