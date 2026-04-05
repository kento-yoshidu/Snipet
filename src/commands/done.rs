use crate::storage;

pub fn run(id: u32) {
    let mut todos = storage::load();
    match todos.iter_mut().find(|t| t.id == id) {
        Some(todo) => {
            todo.done = true;
            let title = todo.title.clone();
            storage::save(&todos);
            println!("完了にしました: [{}] {}", id, title);
        }
        None => eprintln!("エラー: ID {} のタスクが見つかりません", id),
    }
}
