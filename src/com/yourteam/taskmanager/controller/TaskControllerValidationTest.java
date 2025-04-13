
package com.yourteam.taskmanager.controller;

import com.yourteam.taskmanager.service.TaskService;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.junit.jupiter.api.extension.ExtendWith;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(SpringExtension.class)
@WebMvcTest(TaskController.class)
public class TaskControllerValidationTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private TaskService taskService;

    @Test
    public void whenMissingTitle_thenReturns400() throws Exception {
        String taskJson = """
            {
                "title": "",
                "description": "Testing",
                "deadline": "2099-12-31"
            }
        """;

        mockMvc.perform(post("/tasks")
                .contentType(MediaType.APPLICATION_JSON)
                .content(taskJson))
            .andExpect(status().isBadRequest())
            .andExpect(content().string(Matchers.containsString("Title is required")));
    }

    @Test
    public void whenPastDeadline_thenReturns400() throws Exception {
        String taskJson = """
            {
                "title": "Test Task",
                "description": "Invalid deadline",
                "deadline": "2000-01-01"
            }
        """;

        mockMvc.perform(post("/tasks")
                .contentType(MediaType.APPLICATION_JSON)
                .content(taskJson))
            .andExpect(status().isBadRequest())
            .andExpect(content().string(Matchers.containsString("Deadline must be a future date")));
    }
}
