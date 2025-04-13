
import static org.mockito.Mockito.*;
import static org.assertj.core.api.Assertions.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.Optional;

public class TaskControllerTest {

    @Mock
    private TaskService taskService;

    @InjectMocks
    private TaskController taskController;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetAllTasks() {
        Task task1 = new Task(1L, "Read", "Book", false);
        Task task2 = new Task(2L, "Code", "Project", true);
        when(taskService.getAllTasks()).thenReturn(Arrays.asList(task1, task2));

        var response = taskController.getAllTasks();
        assertThat(response.getBody()).hasSize(2);
        assertThat(response.getStatusCodeValue()).isEqualTo(200);
    }

    @Test
    public void testCreateTask() {
        Task task = new Task(null, "Write", "Article", false);
        Task savedTask = new Task(3L, "Write", "Article", false);
        when(taskService.createTask(task)).thenReturn(savedTask);

        ResponseEntity<Task> response = taskController.createTask(task);
        assertThat(response.getBody().getId()).isEqualTo(3L);
        assertThat(response.getStatusCodeValue()).isEqualTo(201);
    }

    @Test
    public void testUpdateTask() {
        Task task = new Task(1L, "Update", "Codebase", true);
        when(taskService.updateTask(eq(1L), any(Task.class))).thenReturn(Optional.of(task));

        ResponseEntity<Task> response = taskController.updateTask(1L, task);
        assertThat(response.getStatusCodeValue()).isEqualTo(200);
    }

    @Test
    public void testDeleteTask() {
        when(taskService.deleteTask(1L)).thenReturn(true);

        ResponseEntity<Void> response = taskController.deleteTask(1L);
        assertThat(response.getStatusCodeValue()).isEqualTo(204);
    }
}
