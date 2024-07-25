package com.imnotdurnk.domain.calendar.controller;

import com.imnotdurnk.domain.calendar.repository.CalendarRepository;
import com.imnotdurnk.domain.user.repository.UserRepository;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.junit.jupiter.api.Assertions.*;



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

    @Test
    void updateFeedback() {
    }

    @Test
    void addCalendar() {
    }

    @Test
    void getCalendar() {
    }

    @Test
    void getStatistics() {
    }

    @Test
    void updateArrivalTime() {
    }

    @Test
    void getPlanDetail() {
    }

    @Test
    void checkTitle() {
    }

    @Test
    void checkDate() {
    }

    @Test
    void checkTime() {
    }
}