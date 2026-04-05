# フェーズ5: 各コマンドの実装

## 作業の目的

`commands/` 配下に add / list / done / delete の各ロジックを実装する。

## 実装方針・手順

### add
1. `storage::load()` でデータを読み込む
2. `storage::next_id()` で新しい ID を採番
3. `PriorityArg` を `todo::Priority` に変換
4. `Todo::new()` でタスクを生成し、push して `storage::save()`

### list
1. `storage::load()` でデータを読み込む
2. `FilterArg` に応じてフィルタリング
3. `comfy-table` でテーブル形式に表示
4. Priority / Status にカラーを付与

### done
1. `storage::load()` でデータを読み込む
2. 対象IDのタスクを `iter_mut` で探し `done = true` に変更
3. `storage::save()` で保存

### delete
1. `storage::load()` でデータを読み込む
2. `retain` で対象IDのタスクを除外
3. `storage::save()` で保存

## 注意事項

- done / delete はIDが見つからない場合 `eprintln!` でエラーメッセージを表示
- list はタスクが0件の場合「タスクがありません」と表示して早期リターン
- Priority のカラー: high=赤、medium=黄、low=緑
- Status のカラー: done=緑、undone=グレー
