package io.nology.todo_backend.posts;

import org.springframework.context.annotation.Conditional;

import jakarta.validation.constraints.NotBlank;

public class CreateToDoItemDTO {
	
	@NotBlank 
	private String title;
	
	@NotBlank
	private String content;
	
	@NotBlank 
	private String category;
	
	
	private boolean isTicked;

	public boolean isTicked() {
		return isTicked;
	}

	public void setTicked(boolean isTicked) {
		this.isTicked = isTicked;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getTitle() {
		return title;
	}

	public String getContent() {
		return content;
	}
	
	public String setTitle() {
		return title;
	}

	public String setContent() {
		return content;
	}
	
	

}
