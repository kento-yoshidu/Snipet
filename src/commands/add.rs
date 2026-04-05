use crate::cli::PriorityArg;
use crate::storage;
use crate::todo::{Priority, Todo};

pub fn run(title: String, priority: PriorityArg) {
    let mut todos = storage::load();
    let id = storage::next_id(&todos);
    let priority = match priority {
        PriorityArg::High => Priority::High,
        PriorityArg::Medium => Priority::Medium,
        PriorityArg::Low => Priority::Low,
    };
    let todo = Todo::new(id, title.clone(), priority);
    todos.push(todo);
    storage::save(&todos);
    println!("追加しました: [{}] {}", id, title);
}
