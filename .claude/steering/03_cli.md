# フェーズ3: CLIの定義

## 作業の目的

`cli.rs` に clap を使ったサブコマンド・オプションの定義を行う。

## 実装方針・手順

1. `Cli` 構造体に `#[derive(Parser)]` を付与し、ルートコマンドとして定義
2. `Command` enum にサブコマンド（add / list / done / delete）を定義
3. `PriorityArg` enum（ValueEnum）で `--priority` オプションの値を定義
4. `FilterArg` enum（ValueEnum）で `--filter` オプションの値を定義

### 各コマンドの引数

| コマンド | 引数/オプション | 型 |
|---|---|---|
| `add` | `title` (positional) | `String` |
| `add` | `--priority` (default: medium) | `PriorityArg` |
| `list` | `--filter` (optional) | `Option<FilterArg>` |
| `done` | `id` (positional) | `u32` |
| `delete` | `id` (positional) | `u32` |

## 注意事項

- `todo::Priority` とは別に `PriorityArg` を定義し、CLI層とドメイン層を分離する
- `FilterArg` は done / undone / high / medium / low の5値
- clap の `derive` feature を使う
