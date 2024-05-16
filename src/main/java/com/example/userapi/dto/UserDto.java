package com.example.userapi.dto;

import com.example.userapi.entity.Role;
import lombok.*;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private long id;
    private String firstName;
    private String lastName;
    private String email;
    private long phoneNumber;
    private String organization;
    private Role role;
}
