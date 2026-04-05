use comfy_table::{Cell, Color, Table};

use crate::cli::FilterArg;
use crate::storage;
use crate::todo::Priority;

pub fn run(filter: Option<FilterArg>) {
    let todos = storage::load();

    let filtered: Vec<_> = todos.iter().filter(|t| match &filter {
        None => true,
        Some(FilterArg::Done) => t.done,
        Some(FilterArg::Undone) => !t.done,
        Some(FilterArg::High) => t.priority == Priority::High,
        Some(FilterArg::Medium) => t.priority == Priority::Medium,
        Some(FilterArg::Low) => t.priority == Priority::Low,
    }).collect();

    if filtered.is_empty() {
        println!("タスクがありません");
        return;
    }

    let mut table = Table::new();
    table.set_header(vec!["ID", "Title", "Priority", "Status", "Created At"]);

    for todo in filtered {
        let priority_cell = match todo.priority {
            Priority::High => Cell::new("high").fg(Color::Red),
            Priority::Medium => Cell::new("medium").fg(Color::Yellow),
            Priority::Low => Cell::new("low").fg(Color::Green),
        };
        let status_cell = if todo.done {
            Cell::new("done").fg(Color::Green)
        } else {
            Cell::new("undone").fg(Color::Grey)
        };
        table.add_row(vec![
            Cell::new(todo.id),
            Cell::new(&todo.title),
            priority_cell,
            status_cell,
            Cell::new(&todo.created_at),
        ]);
    }

    println!("{table}");
}
