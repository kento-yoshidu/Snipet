use crate::storage;

pub fn run(id: u32) {
    let mut todos = storage::load();
    let len_before = todos.len();
    todos.retain(|t| t.id != id);
    if todos.len() < len_before {
        storage::save(&todos);
        println!("削除しました: ID {}", id);
    } else {
        eprintln!("エラー: ID {} のタスクが見つかりません", id);
    }
}
