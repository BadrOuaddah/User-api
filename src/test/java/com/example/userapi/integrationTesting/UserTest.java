package com.example.userapi.integrationTesting;

import com.example.userapi.entity.User;
import com.example.userapi.repository.UserRepository;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import org.json.JSONException;
import org.json.JSONObject;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;

@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class UserTest {

    @LocalServerPort
    private int port;

    @Autowired
    private UserRepository userRepository;

    User user_1 = new User();
    User user_2 = new User();

    @BeforeEach
    public void setUp() {
        RestAssured.baseURI = "http://localhost";
        RestAssured.port = port;

        user_1.setId(1L);
        user_1.setFirstName("Mohammed");
        user_1.setLastName("Ali");
        user_1.setEmail("email@example.com");

        user_2.setId(2L);
        user_2.setFirstName("Omar");
        user_2.setLastName("Fatih");
        user_2.setEmail("email@example.com");

        userRepository.save(user_1);
        userRepository.save(user_2);

    }

    @Test
    public void getAllTest() {
        given()
                .contentType(ContentType.JSON)
                .when()
                .get("/api/v1/users")
                .then()
                .statusCode(200)
                .log().body();
    }

    @Test
    public void getOneTest() {
        given()
                .contentType(ContentType.JSON)
                .when()
                .get("/api/v1/users/" + user_2.getId())
                .then()
                .statusCode(200)
                .body("id", is((int) user_2.getId()))
                .body("firstName", is("Omar"))
                .log().body();
    }

    @Test
    public void postUserTest() throws JSONException {
        JSONObject request = new JSONObject();
        request.put("firstName", "Hicham");
        request.put("lastName", "Hamada");
        request.put("email", "example@email.com");

        given()
                .contentType(ContentType.JSON)
                .body(request.toString())
                .when()
                .post("/api/v1/users")
                .then()
                .statusCode(201)
                .body("firstName", is("Hicham"))
                .log().body();

    }

    @Test
    public void putUserTest() throws JSONException {
        JSONObject request = new JSONObject();
        request.put("userId", 1L);
        request.put("firstName", "Abdellah");

        given()
                .contentType(ContentType.JSON)
                .body(request.toString())
                .when()
                .put("/api/v1/users/1")
                .then()
                .statusCode(200)
                .body("firstName", is("Abdellah"))
                .log().body();

    }

    @Test
    public void deleteUserTest() {
        given()
                .when()
                .delete("/api/v1/users/2")
                .then()
                .statusCode(200)
                .log().body();
    }
}
