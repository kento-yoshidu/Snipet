---
title: "[Rust] 文字列を逆に並べる"
postdate: "2023-06-03"
update: "2023-06-03"
description: "Hello World"
tags: ["Rust", "文字列", "文字列操作"]
icon: "🧸"
---

# 文字列を逆に並べる

与えられた文字列を後ろから並べなおします。`chars()`を使用することでイテレーターが返ってくるので、`rev()`で逆に並べ、`collect()`で`String`として結合します。

```rust
fn main() {
    let s = String::from("Hello World");

    println!("{}", s.chars().rev().collect::<String>());
    //=> dlroW olleH
}
```

3バイト文字が混じっていてもちゃんと扱えます。

```rust
fn main() {
    let s = String::from("こんにちは Hello");
    
    println!("{}", s.chars().rev().collect::<String>());
    //=> olleH はちにんこ
}
```

`String`型だけではなく、`&str`も同様の方法で並べ替えることができます。

```rust
fn main() {
    let s2 = "文字列スライス";
    
    println!("{}", s2.chars().rev().collect::<String>());
    //=> スイラス列字文
}
```

ただし、`&str`を返すことはできません。`collect()`が扱えるのは`FromIterator`トレイトが実装されている型のみです。`String`には実装されていますが、`&str`には実装されていません。

```rust
fn main() {
    let s = "文字列スライス";
    
    println!("🦀❌ {}", s.chars().rev().collect::<&str>());
    /*
        error[E0277]: a value of type `&str` cannot be built from an iterator over elements of type `char`
        --> src/main.rs:4:36
        |
        4 |     println!("{}", s.chars().rev().collect::<&str>());
        |                                    ^^^^^^^ value of type `&str` cannot be built from `std::iter::Iterator<Item=char>`
        |
        = help: the trait `FromIterator<char>` is not implemented for `&str`
        = help: the following other types implement trait `FromIterator<A>`:
                    <String as FromIterator<&'a char>>
                    <String as FromIterator<&'a str>>
                    <String as FromIterator<Box<str>>>
                    <String as FromIterator<Cow<'a, str>>>
                    <String as FromIterator<String>>
                    <String as FromIterator<char>>
    */
}
```

## 参考

[FromIterator in std::iter - Rust](https://doc.rust-lang.org/std/iter/trait.FromIterator.html)

[rust - 文字列に対するcollectの型処理について - スタック・オーバーフロー](https://ja.stackoverflow.com/questions/67806/%E6%96%87%E5%AD%97%E5%88%97%E3%81%AB%E5%AF%BE%E3%81%99%E3%82%8Bcollect%E3%81%AE%E5%9E%8B%E5%87%A6%E7%90%86%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)
