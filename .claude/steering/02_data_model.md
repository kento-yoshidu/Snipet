# フェーズ2: データモデルの定義

## 作業の目的

`todo.rs` に `Todo` 構造体と `Priority` enum を定義する。
serde による JSON シリアライズ/デシリアライズに対応させる。

## 実装方針・手順

1. `Priority` enum を定義（High / Medium / Low）
   - `serde` で lowercase の文字列にシリアライズ
2. `Todo` 構造体を定義
   - フィールド: id, title, priority, done, created_at
3. `Todo` に `new()` コンストラクタを実装

## 注意事項

- `created_at` は `String` 型（ISO 8601形式）とし、chrono クレートは使わない
  - `std::time` も不要。フォーマットは固定文字列で十分
- `id` は `u32` とし、採番は storage 側で行う（ここでは構造体定義のみ）
- `serde` の `rename_all = "lowercase"` を使い JSON キーを小文字に統一する
