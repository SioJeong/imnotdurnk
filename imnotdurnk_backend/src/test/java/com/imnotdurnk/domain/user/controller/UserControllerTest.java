//package com.imnotdurnk.domain.user.controller;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.imnotdurnk.domain.auth.enums.TokenType;
//import com.imnotdurnk.domain.user.dto.LoginUserDto;
//import com.imnotdurnk.domain.user.dto.UserDto;
//import com.imnotdurnk.domain.user.repository.UserRepository;
//import com.imnotdurnk.domain.user.service.UserServiceImpl;
//import com.imnotdurnk.global.util.JwtUtil;
//import jakarta.mail.internet.MimeMessage;
//import jakarta.servlet.http.Cookie;
//import org.junit.jupiter.api.*;
//import org.mockito.*;
//import org.mockito.MockitoAnnotations;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.data.redis.core.StringRedisTemplate;
//import org.springframework.data.redis.core.ValueOperations;
//import org.springframework.http.MediaType;
//import org.springframework.mail.javamail.JavaMailSender;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.setup.MockMvcBuilders;
//import org.springframework.web.context.WebApplicationContext;
//
//import static org.mockito.Mockito.doNothing;
//import static org.mockito.Mockito.when;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//import static org.mockito.Mockito.*;
//
///*
// * 회원 기능 통합 테스트
// */
//@SpringBootTest
//@AutoConfigureMockMvc
//@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
//class UserControllerTest {
//
//    @Autowired
//    private MockMvc mockMvc;
//
//    @Autowired
//    private UserController userController;
//
//    @Autowired
//    private UserServiceImpl userService;
//
//    @Autowired
//    private UserRepository userRepository;
//
//    @Autowired
//    private ObjectMapper objectMapper;
//
//    @Autowired
//    private WebApplicationContext webApplicationContext;
//
//    // Redis와 JavaMailSender는 Mocking하여 테스트
//    @MockBean
//    private JavaMailSender mailSender;
//
//    @MockBean
//    private StringRedisTemplate stringRedisTemplate;
//
//    @MockBean
//    private ValueOperations<String, String> valueOperations;
//
//    @Autowired
//    private JwtUtil jwtUtil;
//
//
//    @BeforeEach
//    public void setUp() {
//        MockitoAnnotations.openMocks(this);
//        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
//        when(stringRedisTemplate.opsForValue()).thenReturn(valueOperations);
//        Mockito.when(stringRedisTemplate.opsForValue().get("123456")).thenReturn("test@example.com");
//        // Redis에 key가 "123456"인 값을 찾으면 "test@example.com"을 리턴
//
//        MimeMessage mimeMessage = mock(MimeMessage.class);
//        when(mailSender.createMimeMessage()).thenReturn(mimeMessage);
//        doNothing().when(mailSender).send(any(MimeMessage.class));
//        // 메일은 전송하지 않음
//    }
//
//    @Test
//    @Order(1)
//    public void testSignUp() throws Exception {
//        UserDto userDto = UserDto.builder()
//                .email("test@example.com")
//                .password("Password1234")
//                .name("이름")
//                .phone("010-1234-1234")
//                .build();
//
//        mockMvc.perform(post("/users/signup")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(objectMapper.writeValueAsString(userDto)))
//                .andExpect(status().isCreated());
//    }
//
//    @Test
//    @Order(2)
//    public void testVerifyEmail() throws Exception {
//        String email = "test@example.com";
//
//        mockMvc.perform(get("/users/signup/verify").param("email", email))
//                .andExpect(status().isOk());
//    }
//
//    @Test
//    @Order(3)
//    public void testVerifyCode() throws Exception {
//        String email = "test@example.com";
//        String code = "123456";
//
//        mockMvc.perform(post("/users/signup/verify-code")
//                        .param("email", email)
//                        .param("code", code))
//                .andExpect(status().isOk());
//    }
//
//    @Test
//    @Order(4)
//    public void testLogin() throws Exception {
//        LoginUserDto user = new LoginUserDto("test@example.com", "Password1234");
//        mockMvc.perform(post("/users/login")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(objectMapper.writeValueAsString(user)))
//                .andExpect(status().isOk());
//    }
//
//    @Test
//    @Order(5)
//    public void testSendNewPassword() throws Exception {
//        String email = "test@example.com";
//
//        mockMvc.perform(get("/users/login/find-password")
//                        .param("email", email))
//                .andExpect(status().isOk());
//    }
//
//    @Test
//    @Order(6)
//    public void testUpdateProfile() throws Exception {
//
//        String accessToken = jwtUtil.generateToken("test@example.com", TokenType.ACCESS).getToken();
//
//        UserDto userDto = UserDto.builder()
//                .password("Newpassword123")
//                .name("Updated User")
//                .build();
//
//        mockMvc.perform(put("/users/profile")
//                        .header("Authorization", "Bearer " + accessToken)
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(objectMapper.writeValueAsString(userDto)))
//                .andExpect(status().isOk());    }
//
//    @Test
//    @Order(7)
//    public void testGetProfile() throws Exception {
//
//        String accessToken = jwtUtil.generateToken("test@example.com", TokenType.ACCESS).getToken();
//        mockMvc.perform(get("/users/profile")
//                        .header("Authorization", "Bearer " + accessToken))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.data.email").value("test@example.com"));
//                // 반환받은 프로필의 이메일이 test@example.com인지 확인
//    }
//
//    @Test
//    @Order(8)
//    public void testLogout() throws Exception {
//        String accessToken = jwtUtil.generateToken("test@example.com", TokenType.ACCESS).getToken();
//        String refreshToken = jwtUtil.generateToken("test@example.com", TokenType.REFRESH).getToken();
//
//        mockMvc.perform(get("/users/logout")
//                        .header("Authorization", "Bearer " + accessToken)
//                        .cookie(new Cookie("RefreshToken", refreshToken)))
//                .andExpect(status().isOk());
//    }
//}
