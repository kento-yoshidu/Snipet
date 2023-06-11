---
title: "[Rust]文字列の大文字/小文字をカウントする"
postdate: "2023-06-11"
update: "2023-06-11"
description: "文字列に含まれる大文字/小文字の数をカウントします。"
tags: ["Rust", "文字列", "数を数える", "大文字/小文字", "filter"]
icon: "⚡"
---

# 文字列の大文字/小文字をカウントする

例として、`Hello World`という`String`型の中に含まれている大文字の数をカウントする方法を考えます。

前提として、`Char`型には`is_uppercase()`が生えていて、その名の通り`Char`の値が大文字なら`true`、大文字でなければ`false`が返ってきます。

```rust
pub fn run() {
    println!("{}", 'A'.is_uppercase());
    //=> true

    println!("{}", 'a'.is_uppercase());
    //=> false

    println!("{}", '_'.is_uppercase());
    //=> false
}
```

しかし、`is_uppercase()`はあくまで`Char`型のメソッドであり、`String`型や`&str`型からは呼べません。

```rust
    // String型では使えない
    println!("🦀❌ {}", String::from("Hello").is_uppercase());
    // error[E0599]: no method named `is_uppercase` found for struct `String` in the current scope

    // &str型も同じく使えない
    println!("🦀❌ {}", "Hello".is_uppercase());
    // error[E0599]: no method named `is_uppercase` found for reference `&'static str` in the current scope
```

ということで、`chars()`を用いて`Char`型のイテレーターを得て、`is_uppercase`を呼びます。以下の例では`for_each`文で各文字の`is_uppercase()`の結果を確認しています。

```rust
fn main() {
    let s = String::from("Hello World");

    // chars()を呼んでイテレーターとして回す
    s.chars().for_each(|c| {
        println!("{} = {}", c, c.is_uppercase());
        /*
            H = true
            e = false
            l = false
            l = false
            o = false
              = false
            W = true
            o = false
            r = false
            l = false
            d = false
        */
    });
}
```

本題である大文字の数を数えるために、`filter`を使用してみます。

```rust
fn main() {
    let count = s.chars().filter(|c| {
        // これがtrueだったらカウントされる
        c.is_uppercase()
    }).count();

    println!("{}", count);
    //=> 2
}
```

これは`&str`でも同じようにカウントできます。

```rust
fn main() {
    let count2 = s2.chars().filter(|c| {
        c.is_uppercase()
    }).count();

    println!("{}", count2);
    //=> 2
}
```
