---
title: "【書きかけ】【Rust】ベクター型をfor-inで回す"
postdate: "2023-04-05"
update: "2023-04-05"
description: "配列の要素の型を変換します。"
tags: ["Rust", "ベクター型", "所有権"]
icon: "🦏"
---

# ベクター型をfor-inで回す


```rust
fn main() {
    let vec = vec![0, 1, 2, 3];

    for num in vec {
        println!("for-inを使ってvecの値を出力する {}", num);
        /*
          for-in文を使ってvecの値を出力する 0
          for-in文を使ってvecの値を出力する 1
          for-in文を使ってvecの値を出力する 2
          for-in文を使ってvecの値を出力する 3
          for-in文を使ってvecの値を出力する 4
        */
    }
}
```

ただし、moveが起きるため、`vec`にはアクセスできなくなります。

```rust
fn main() {
    let vec = vec![0, 1, 2, 3];

    for num in vec {
        println!("for-inを使ってvecの値を出力する {}", num);
    }

    pritnln!("{:?}", vec);
    /*
        error[E0382]: borrow of moved value: `vec`
          --> src\my_type\vec.rs:24:22
            |
        7   |     let mut vec = vec![0, 1, 2, 3];
            |         ------- move occurs because `vec` has type `Vec<i32>`, which does not implement the `Copy` trait
        ...
        20  |     for num in vec {
            |                --- `vec` moved due to this implicit call to `.into_iter()`
        ...
        24  |     println!("{:?}", vec);
            |                      ^^^ value borrowed here after move
    */
}
```
