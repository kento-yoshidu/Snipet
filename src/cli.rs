use clap::{Parser, Subcommand, ValueEnum};

#[derive(Debug, Parser)]
#[command(name = "todo", about = "シンプルなCLI Todoアプリ")]
pub struct Cli {
    #[command(subcommand)]
    pub command: Command,
}

#[derive(Debug, Subcommand)]
pub enum Command {
    /// タスクを追加する
    Add {
        /// タスクのタイトル
        title: String,
        /// 優先度（デフォルト: medium）
        #[arg(long, default_value = "medium")]
        priority: PriorityArg,
    },
    /// タスク一覧を表示する
    List {
        /// フィルタリング
        #[arg(long)]
        filter: Option<FilterArg>,
    },
    /// タスクを完了にする
    Done {
        /// タスクのID
        id: u32,
    },
    /// タスクを削除する
    Delete {
        /// タスクのID
        id: u32,
    },
}

#[derive(Debug, Clone, ValueEnum)]
pub enum PriorityArg {
    High,
    Medium,
    Low,
}

#[derive(Debug, Clone, ValueEnum)]
pub enum FilterArg {
    Done,
    Undone,
    High,
    Medium,
    Low,
}
