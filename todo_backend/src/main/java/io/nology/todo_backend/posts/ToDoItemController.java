package io.nology.todo_backend.posts;


import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/items")
public class ToDoItemController {
	
	@Autowired
	private ToDoItemService toDoItemService;
	
	@PostMapping
	public ResponseEntity<ToDoItem> createPost(@Valid @RequestBody CreateToDoItemDTO data) {
		ToDoItem createdItem = this.toDoItemService.createItem(data);
		return new ResponseEntity<>(createdItem, HttpStatus.CREATED);
	}
	
	@GetMapping
	public ResponseEntity<List<ToDoItem>> getAllPosts() {
		List<ToDoItem> allItems = this.toDoItemService.getAll();
		return new ResponseEntity<>(allItems, HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<ToDoItem> getItemById(@PathVariable Long id) {
		Optional<ToDoItem> maybeItem = this.toDoItemService.findItemById(id);
		
		if (maybeItem.isPresent()) {
            ToDoItem foundItem = maybeItem.get();
            return new ResponseEntity<>(foundItem, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
	}
	
	@PatchMapping("/{id}")
	public ResponseEntity<ToDoItem> updateItemById(@Valid @RequestBody UpdateToDoItemDTO data, @PathVariable Long id) {
		
		Optional<ToDoItem> maybeUpdatedItem = this.toDoItemService.updateById(data, id);
		
		if (maybeUpdatedItem.isPresent()) {
            ToDoItem foundItem = maybeUpdatedItem.get();
            return new ResponseEntity<>(foundItem, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<ToDoItem> deletePostById(@PathVariable Long id) {
		boolean deleted = this.toDoItemService.deletePostById(id);
		
		if (!deleted) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
	}


	@ExceptionHandler(MethodArgumentNotValidException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public ResponseEntity<Object> handleValidationExceptions(MethodArgumentNotValidException ex) {
		Map<String, String> errors = new HashMap<>();
		ex.getBindingResult().getAllErrors().forEach((error) -> {
			String fieldName = ((FieldError) error).getField();
			String errorMessage = error.getDefaultMessage();
			errors.put(fieldName, errorMessage);
    });
    return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
}}
