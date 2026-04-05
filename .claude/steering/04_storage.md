# フェーズ4: ストレージの実装

## 作業の目的

`storage.rs` に JSON ファイルの読み書きと ID 採番を実装する。

## 実装方針・手順

1. `data_path()` で OS ごとの保存先パスを解決する（`dirs` クレート使用）
2. `load()` で JSON ファイルを読み込み `Vec<Todo>` を返す（ファイルなし・パースエラーは空vec）
3. `save()` で `Vec<Todo>` を JSON ファイルに書き込む（ディレクトリは自動作成）
4. `next_id()` で現在の最大IDに+1した値を返す

### 保存先パス

| OS | パス |
|---|---|
| Linux / macOS | `~/.local/share/todo/todos.json` |
| Windows | `%APPDATA%\todo\todos.json` |

## 注意事項

- `dirs::data_dir()` が None の場合はカレントディレクトリにフォールバック
- `load()` はファイル不在・パース失敗いずれも空 vec を返し、エラーで落ちない
- `save()` は `create_dir_all` でディレクトリを自動生成する
