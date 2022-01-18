---
title: Cool new Python typing features
date: 2022-01-18T22:13:46.273Z
description: ...
---

## Introduction

Python is great at being a dynamically and strongly-typed programming language. However, once you get enough mileage working with large Python codebases, you'll probably realize that dyanmic types can be confusing, cause bugs, and result in unexpected behavior. The folks maintaining Python realized this as well, and decided to implement a built-in way to add static type annotations in Python (see [PEP 484](https://www.python.org/dev/peps/pep-0484/)).

More than 8 years have passed since then, and type hinting in Python has improved, with new features being implemented in every new Python version. In this post, I wanted to go over some of the newly added features, with the hopes that you will find them useful and integrate them into your codebase.

## `Protocol` and `@runtime_checkable`

For more info, see [PEP 544](https://www.python.org/dev/peps/pep-0544/).

## Generics

For more info, see [PEP 585](https://www.python.org/dev/peps/pep-0585/).

## Literal types

For more info, see [PEP 586](https://www.python.org/dev/peps/pep-0586/).

## Final typing qualifier

For more info, see [PEP 591](https://www.python.org/dev/peps/pep-0591/).

## Runtime type annotations

For more info, see [PEP 593](https://www.python.org/dev/peps/pep-0593/).

## Parameter specification variables

For more info, see [PEP 612](https://www.python.org/dev/peps/pep-0612/).

## User-defined type guards

For more info, see [PEP 647](https://www.python.org/dev/peps/pep-0647/).
