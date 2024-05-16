package com.example.userapi.mapper;

import com.example.userapi.dto.UserDto;
import com.example.userapi.entity.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserDto toDTO(User user);
    User toEntity(UserDto userDto);
}
