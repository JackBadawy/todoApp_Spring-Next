package io.nology.todo_backend.posts;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

@Service
@Transactional
public class ToDoItemService {
	
    @Autowired
    private ToDoItemRepository repo;
    
    @Autowired 
    private ModelMapper mapper;
    
    public ToDoItem createItem(CreateToDoItemDTO data) {
    	// add validation errors
    	
    	ToDoItem newItem = mapper.map(data, ToDoItem.class);
    	
    	return this.repo.save(newItem);
    }
    
    public List<ToDoItem> getAll() {
    	return this.repo.findAll();
    }
    
    public Optional<ToDoItem> findItemById(Long id) {
    	return this.repo.findById(id);
    }
    
    public Optional<ToDoItem> updateById(@Valid UpdateToDoItemDTO data, Long id) {
    	
    	Optional<ToDoItem> maybeItem = this.findItemById(id);
    	
    	if (maybeItem.isEmpty()) {
    		return maybeItem;
    	}
    	
    	ToDoItem foundItem = maybeItem.get();
    	
    	mapper.map(data, foundItem);
    	
    	ToDoItem updatedItem = this.repo.save(foundItem);
    	
    	return Optional.of(updatedItem);
    }
    
    public boolean deletePostById(Long id) {
    	Optional<ToDoItem> maybeItem = this.repo.findById(id);
    	if (maybeItem.isEmpty()) return false;
    	this.repo.delete(maybeItem.get());
    	return true;
    }

}
