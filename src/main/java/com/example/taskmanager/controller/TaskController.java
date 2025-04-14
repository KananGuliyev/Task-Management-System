package com.example.taskmanager.controller;

import com.example.taskmanager.model.Task;
import com.example.taskmanager.model.User;
import com.example.taskmanager.service.TaskService;
import com.example.taskmanager.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody Task task, @AuthenticationPrincipal UserDetails userDetails) {
        User user = userService.findByUsername(userDetails.getUsername());
        task.setUser(user);
        return ResponseEntity.ok(taskService.createTask(task));
    }

    @GetMapping
    public List<Task> getTasks(@AuthenticationPrincipal UserDetails userDetails) {
        User user = userService.findByUsername(userDetails.getUsername());
        return taskService.getTasksForUser(user);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @RequestBody Task updatedTask, @AuthenticationPrincipal UserDetails userDetails) {
        User user = userService.findByUsername(userDetails.getUsername());
        Task existingTask = taskService.getTaskById(id);

        if (existingTask == null || !existingTask.getUser().getId().equals(user.getId())) {
            return ResponseEntity.status(403).build(); // Forbidden
        }

        updatedTask.setId(id);
        updatedTask.setUser(user);
        return ResponseEntity.ok(taskService.updateTask(updatedTask));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id, @AuthenticationPrincipal UserDetails userDetails) {
        Task task = taskService.getTaskById(id);
        User user = userService.findByUsername(userDetails.getUsername());

        if (task == null || !task.getUser().getId().equals(user.getId())) {
            return ResponseEntity.status(403).build();
        }

        taskService.deleteTask(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id, @AuthenticationPrincipal UserDetails userDetails) {
        Task task = taskService.getTaskById(id);
        User user = userService.findByUsername(userDetails.getUsername());

        if (task == null || !task.getUser().getId().equals(user.getId())) {
             return ResponseEntity.status(403).build(); // Forbidden or Not Found
    }

    return ResponseEntity.ok(task);
}

}

