package com.example.userapi.mapper;

import com.example.userapi.dto.UserDto;
import com.example.userapi.entity.User;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {
//    UserDto toDTO(User user);
//
//    User toEntity(UserDto userDto);

    // todo: you can minimize code like this 👇

    UserDto map(User user);
    User map (UserDto dto);

    // so you can call one method , if you pass entity it will return Dto and vise versa...
    // if you get it , you can delete toDTo() and toEntity()

    List<UserDto> toDTOs(List<User> userList);
}
