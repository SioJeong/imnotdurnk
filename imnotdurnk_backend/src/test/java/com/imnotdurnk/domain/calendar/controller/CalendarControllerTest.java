package com.imnotdurnk.domain.calendar.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.imnotdurnk.domain.auth.enums.TokenType;
import com.imnotdurnk.domain.calendar.dto.CalendarDto;
import com.imnotdurnk.domain.calendar.entity.CalendarEntity;
import com.imnotdurnk.domain.calendar.repository.CalendarRepository;
import com.imnotdurnk.domain.calendar.service.CalendarServiceImpl;
import com.imnotdurnk.domain.user.entity.UserEntity;
import com.imnotdurnk.domain.user.repository.UserRepository;
import com.imnotdurnk.global.util.JwtUtil;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import java.util.ArrayList;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


/*
 * 캘린더 기능 통합 테스트
 */
@SpringBootTest
@AutoConfigureMockMvc
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class CalendarControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private CalendarController calendarController;

    @Autowired
    private CalendarRepository calendarRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ObjectMapper objectMapper;


    private String useremail="test@example.com";
    private String userpassword="Password123";
    private String token;
    private Integer planId;

    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private CalendarServiceImpl calendarServiceImpl;

    @BeforeEach
    public void setUp() {

        UserEntity user = userRepository.findByEmail(useremail);

        if (user == null) {
            user = UserEntity.builder()
                    .email(useremail)
                    .password(userpassword)
                    .phone("010-123-1234")
                    .name("test")
                    .verified(true)
                    .build();
        }
        user.setDeleted(false);
        userRepository.save(user); // 테스트를 위한 유저

        List<CalendarEntity> calendarList = calendarRepository.findByUserEntity_Email(user.getEmail());
        if(calendarList.size()>0) {
            CalendarEntity calendar = calendarList.getFirst();
            planId = calendar.getId();
        }

        token=jwtUtil.generateToken( useremail, TokenType.ACCESS).getToken();
    }

    @Test
    @Order(1)
    public void testAddCalendar() throws Exception {
        CalendarDto calendarDto = new CalendarDto();
        calendarDto.setTitle("Test Title");
        calendarDto.setDate("2024-10-12T10:10");

        mockMvc.perform(post("/calendars")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(calendarDto)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.message").value("일정 등록이 완료되었습니다."));
    }

    @Test
    @Order(2)
    public void testGetCalendar() throws Exception {
        String dateStr = "2023-07-25";

        List<CalendarDto> plans = new ArrayList<>();
        plans.add(CalendarDto.builder().title("Test Get Calendar Title").build());

        mockMvc.perform(get("/calendars/{date}/plans", dateStr)
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("일정 조회에 성공하였습니다."))
                .andExpect(jsonPath("$.dataList").isArray());
    }

    @Test
    @Order(3)
    public void testUpdateFeedback() throws Exception {
        CalendarDto calendarDto = CalendarDto.builder()
                .title("업데이트")
                .build();
        String date = "2025-10-12T10:10";

        mockMvc.perform(put("/calendars/{date}/plans/{planId}", date, planId)
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(calendarDto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("피드백 등록이 완료되었습니다."));
    }

    @Test
    @Order(4)
    public void testGetPlanDetail() throws Exception {
        mockMvc.perform(get("/calendars/plans/{planId}", planId)
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("일정 조회에 성공하였습니다."));
    }

    @Test
    @Order(5)
    public void testUpdateArrivalTime() throws Exception {
        String arrivalTime = "11:10";

        mockMvc.perform(get("/calendars/{planId}", planId)
                        .header("Authorization", "Bearer " + token)
                        .param("arrival-time", arrivalTime))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("도착 시간이 등록되었습니다."));
    }

}