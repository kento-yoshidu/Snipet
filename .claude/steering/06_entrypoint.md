# フェーズ6: エントリーポイントの実装

## 作業の目的

`main.rs` で CLI のパースと各コマンドへのディスパッチを行う。

## 実装方針・手順

1. `Cli::parse()` で引数をパース
2. `match cli.command` で各サブコマンドに振り分け
3. 各 `commands::*::run()` を呼び出す

## 注意事項

- エラーハンドリングは各コマンド内で完結しているため、main はシンプルに保つ
- `mod` 宣言は `cli / commands / storage / todo` の4つ
