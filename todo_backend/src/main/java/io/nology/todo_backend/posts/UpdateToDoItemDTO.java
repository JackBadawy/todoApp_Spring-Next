package io.nology.todo_backend.posts;

import jakarta.validation.constraints.Pattern;

public class UpdateToDoItemDTO {
	
	@Pattern(regexp = "^(?=\\S).*$", message="title cannot be empty")
	private String title;
	
	@Pattern(regexp = "^(?=\\S).*$", message="content cannot be empty")
	private String content;
	
	@Pattern(regexp = "^(?=\\S).*$", message="category cannot be empty")
	private String category;
	
	private boolean isTicked;
	
	public boolean isTicked() {
	return isTicked;
	}

	public void setTicked(boolean isTicked) {
	this.isTicked = isTicked;
	}

	public String getTitle() {
		return title;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getContent() {
		return content;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public void setContent(String content) {
		this.content = content;
	}

	
}
