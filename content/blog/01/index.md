---
title: "【JS】型Tの配列を型Uの配列に変換する"
postdate: "2023-01-01"
update: "2023-01-13"
description: "配列の要素の型を変換します。"
tags: ["JavaScript", "型", "配列"]
icon: "🧸"
---

# 文字列の配列を数値の配列に変換する

`["0", "1", "2"]`のように、文字列が格納されている配列について、各要素を数値に変換する方法を考えます。

`Array.prototype.map()`を使用することで配列の各要素を取り出し、数値に変換し返すことができます。

```js
["0", "1", "2"].map(Number);
//=> [0, 1, 2]

["1.2", "0.2", "3.0"].map(Number);
//=> [ 1.2, 0.2, 3 ]
```

## 他の型への変換も

この要領で様々な型への変換を行うこともできます。

```js
// 数値型から文字列型への変換
console.log([0, 1, 2].map(String));
//=> [ '0', '1', '2' ]

// 数値型から真偽値型への変換
console.log([1, 2, 3].map(Boolean));
//=> [ true, true, true ]

// 数値型からBigInt型への変換
console.log([0, 1, 2].map(BigInt));
//=> [ 0n, 1n, 2n ]
```

## mapは新たな配列を生成する

`map`は値を返し新たな配列を生成するので、元の配列を変更することはありません。

```js
const array = [1, 2, 3];

const newArray = array.map(String);

console.log(array, newArray);
//=> [ 1, 2, 3 ] [ '1', '2', '3' ]
```

## n次元の配列の要素を任意の型に変換する

例えば2次元配列を考えます。2次元配列を上記のように単純にマップにかけるだけでは思った通りの出力になりません。

```js
const array = [[1, 2, 3], 4];

console.log(array.map(String));
//=> [ '1', '2,3,4' ]
```

`'4'`は思った通りに文字列型に変換されていますが、`[1, 2, 3]`がまとめて`1,2,3`という風に一つの文字列として括られてしまっています。

多次元配列の型変換に関しては、以下のページを参考に再帰関数を定義して実装しました。

[JSの多次元配列の要素全てを文字列から数値に変換する方法](https://teratail.com/questions/334737)

```js
const func = (args) => {
  return args.map((arg) => {
    return (arg instanceof Array) ? func(arg) : String(arg);
  });
};

const array = [[1, 2, 3], 4];

const newArray = func(array);

console.log(newArray);
//=> [ [ '1', '2', '3' ], [ '4', [ '5', '6', '7' ] ] ]
```

`instanceof`演算子は、左オペランドの値が右オペランドのオブジェクトから生成されたものかどうかを判定します。

[instanceof | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/instanceof)

```js
console.log([1, 2, 3] instanceof Array);
//=> true

console.log(4 instanceof Array);
//=> false
```

多次元配列を`map`で回し、要素が配列だった場合は再度`func`関数に渡し、要素が配列でなかった場合は`String()`で文字列に変換します。せっかくなので3次元配列でテストしてみました。

```js
const func = (args) => {
  return args.map((arg) => {
    return (arg instanceof Array) ? func(arg) : String(arg);
  });
};

const array = [
  [1, 2, 3],
  [4, 5, 6, [7, 8, 9]]
];

const newArray = func(array);

console.log(newArray);
//=> [ [ '1', '2', '3' ], [ '4', '5', '6', [ '7', '8', '9' ] ] ]
```

## 参考

[javascript - What does map(Number) do here? - Stack Overflow](https://stackoverflow.com/questions/48343478/what-does-mapnumber-do-here)

[JSの多次元配列の要素全てを文字列から数値に変換する方法](https://teratail.com/questions/334737)
