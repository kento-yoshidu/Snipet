use std::fs;
use std::path::PathBuf;

use crate::todo::Todo;

fn data_path() -> PathBuf {
    let dir = dirs::data_dir()
        .unwrap_or_else(|| PathBuf::from("."))
        .join("todo");
    dir.join("todos.json")
}

pub fn load() -> Vec<Todo> {
    let path = data_path();
    if !path.exists() {
        return vec![];
    }
    let content = fs::read_to_string(&path).unwrap_or_default();
    serde_json::from_str(&content).unwrap_or_default()
}

pub fn save(todos: &[Todo]) {
    let path = data_path();
    if let Some(dir) = path.parent() {
        fs::create_dir_all(dir).expect("データディレクトリの作成に失敗しました");
    }
    let content = serde_json::to_string_pretty(todos).expect("JSONのシリアライズに失敗しました");
    fs::write(&path, content).expect("ファイルの書き込みに失敗しました");
}

pub fn next_id(todos: &[Todo]) -> u32 {
    todos.iter().map(|t| t.id).max().unwrap_or(0) + 1
}
