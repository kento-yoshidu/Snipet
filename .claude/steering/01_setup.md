# フェーズ1: プロジェクトセットアップ

## 作業の目的

Rustプロジェクトの初期構成を整える。
依存クレートの追加、ディレクトリ構成・モジュール構成の定義まで行う。

## 実装方針・手順

1. `cargo init` でプロジェクトを初期化する（既存ディレクトリに対して実行）
2. `Cargo.toml` に依存クレートを追加する
3. `src/` 配下にモジュール構成を作成する（空ファイルでOK）

### 依存クレート

| クレート | バージョン | 用途 |
|---|---|---|
| `clap` | 4.x (`features = ["derive"]`) | CLIの引数パース |
| `serde` | 1.x (`features = ["derive"]`) | シリアライズ/デシリアライズ |
| `serde_json` | 1.x | JSONの読み書き |
| `comfy-table` | 7.x | テーブル形式の表示 |
| `colored` | 2.x | カラー出力 |
| `dirs` | 5.x | OSごとのデータ保存先の解決 |

### モジュール構成

```
src/
├── main.rs       # エントリーポイント、CLIの定義
├── cli.rs        # clapによるコマンド・引数の定義
├── todo.rs       # Todo構造体・Priority enumの定義
├── storage.rs    # JSONファイルの読み書き
└── commands/
    ├── mod.rs
    ├── add.rs
    ├── list.rs
    ├── done.rs
    └── delete.rs
```

## 注意事項

- `cargo init` は既存ディレクトリに対して実行するため `--name claude-todo` を指定する
- モジュールファイルは空でよい（中身は次フェーズ以降で実装）
- コミットは以下の2つに分ける:
  1. `cargo init` + `Cargo.toml`（依存クレート追加）
  2. モジュール構成の作成
