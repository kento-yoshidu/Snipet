# claude-todo

RustによるシンプルなCLI Todoアプリ。

## 作業ルール

### コミット

- コミットは小さく・目的単位で行う
- 1コミット = 1つの変更目的（例: 「データ構造の定義」「add コマンドの実装」など）
- まとめてコミットしない

### ステアリングファイル

- 新しいフェーズに入る**前**に `.claude/steering/` 配下にステアリングファイルを生成する
- ステアリングファイルは「事後の記録」ではなく「事前の宣言・指針」として機能させる
- ファイル名は連番＋作業内容（例: `01_setup.md`、`02_data_model.md`）
- ステアリングファイルには以下を記載する:
  - 作業の目的
  - 実装方針・手順
  - 注意事項
- コミットメッセージは「何をしたか」の記録、ステアリングファイルは「何をするか」の指針として役割を分ける



## 機能仕様

### コマンド

| コマンド | 説明 |
|---|---|
| `todo add <タイトル>` | タスクを追加する |
| `todo list` | タスク一覧をテーブル形式で表示する |
| `todo done <id>` | 指定したタスクを完了にする |
| `todo delete <id>` | 指定したタスクを削除する |

### オプション

| オプション | 対象コマンド | 説明 |
|---|---|---|
| `--priority <high\|medium\|low>` | `add` | 優先度を指定する（デフォルト: `medium`） |
| `--filter <done\|undone\|high\|medium\|low>` | `list` | 表示するタスクをフィルタリングする |

### 使用例

```bash
todo add "牛乳を買う" --priority low
todo add "レポートを提出する" --priority high
todo list
todo list --filter high
todo list --filter undone
todo done 1
todo delete 2
```

## データ仕様

### 保存先

| OS | パス |
|---|---|
| Linux / macOS | `~/.local/share/todo/todos.json` |
| Windows | `%APPDATA%\todo\todos.json` |

### データ構造

```rust
struct Todo {
    id: u32,
    title: String,
    priority: Priority,  // High / Medium / Low
    done: bool,
    created_at: String,  // ISO 8601形式
}

enum Priority {
    High,
    Medium,
    Low,
}
```

### JSONフォーマット例

```json
[
  {
    "id": 1,
    "title": "牛乳を買う",
    "priority": "low",
    "done": false,
    "created_at": "2026-04-04T10:00:00"
  }
]
```

## 表示仕様

### list コマンドの出力例

```
+----+----------------------+----------+--------+---------------------+
| ID | Title                | Priority | Status | Created At          |
+----+----------------------+----------+--------+---------------------+
|  1 | 牛乳を買う           | low      | undone | 2026-04-04 10:00:00 |
|  2 | レポートを提出する   | high     | done   | 2026-04-04 11:00:00 |
+----+----------------------+----------+--------+---------------------+
```

- Priority の表示カラー: `high` = 赤、`medium` = 黄、`low` = 緑
- Status の表示カラー: `done` = 緑、`undone` = グレー

## 使用クレート

| クレート | 用途 |
|---|---|
| `clap` | CLIの引数パース |
| `serde` + `serde_json` | JSONのシリアライズ/デシリアライズ |
| `comfy-table` | テーブル形式の表示 |
| `colored` | カラー出力 |
| `dirs` | OSごとのデータ保存先の解決 |
