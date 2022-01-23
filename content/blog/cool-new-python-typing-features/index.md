---
title: Cool new Python typing features
date: 2022-01-18T22:13:46.273Z
description: ...
---

## Introduction

Python is great at being a dynamically and strongly-typed programming language. However, once you get enough mileage working with large Python codebases, you'll probably realize that dyanmic types can be confusing, cause bugs, and result in unexpected behavior. The folks maintaining Python realized this as well, and decided to implement a built-in way to add static type annotations in Python (see [PEP 484](https://www.python.org/dev/peps/pep-0484/)).

More than 8 years have passed since then, and type hinting in Python has improved, with new features being implemented in every new Python version. In this post, I wanted to go over some of the newly added features, with the hopes that you will find them useful and integrate them into your codebase.

## Parameter specification variables

Let's imagine you'd like to write a simple decorator, which print a message every time a method is called:

```python
from typing import Callable, TypeVar

R = TypeVar('R')


def log(func: Callable[..., R]) -> Callable[..., R]:
	def wrapper(*args, **kwargs):
		print('Method has been called!')
		return func(*args, **kwargs)

	return wrapper


@log
def add(a: int, b: int) -> int:
	return a + b
```

The following call to `add` is invalid, and one would expect type checkers to report it as an error, however it will only fail at runtime:

```python
add(1, 'a')  # Fails at runtime
```

This is because the the decorated `add` has the typing `Callable[..., int]` (with `...` meaning arguments aren't valdiated). [PEP 612](https://www.python.org/dev/peps/pep-0612/) addresses this issue, by introducing `ParamSpec`. `ParamSpec` variables are a new type of type variables, used for defining the dependencies between different callables (such as decorators and the decorated method).

Using `ParamSpec`, we can modify the example above to enforce the parameters types of the decorated method, while maintaining the decorator's flexibility:

```python
from typing import Callable, ParamSpec, TypeVar

P = ParamSpec('P')
R = TypeVar('R')


def log(func: Callable[P, R]) -> Callable[P, R]:
	def wrapper(*args: P.args, **kwargs: P.kwargs):
		print('Method has been called!')
		return func(*args, **kwargs)

	return wrapper


@log
def add(a: int, b: int) -> int:
	return a + b
```

The following will now be reported as an error by the type checker:

```python
add(1, 'a')  # Rejected by the type checker
```

## User-defined type guards

Moving on to to the next example - let's assume you're writing a utility method, validating that an object is of a desired type (used for [type narrrowing](https://mypy.readthedocs.io/en/latest/type_narrowing.html)):

```python
from typing import Union

RealNumber = Union[int, float]


def is_real_number(value: object) -> bool:
	return isinstance(value, int) or isinstance(value, float)


def print_value_type(value: object):
	if is_real_number(value):
		assert value == value.real  # Error: invalid type
		print(f'Given value is a real number!')
	else:
		print('Given value is of unknown type')
```

The above code is valid, however static type checkers will report an error because a type checker doesn't have enough information to verify that the type of `value` is `RealNumber`. We can change the return type hint of `is_real_numeber` to `TypeGuard[RealNumber]`, which will signal to type checkers that if the method returns `True`, `value` is of type `RealNumber`. Now, type checkers won't report any errors:

```python
from typing import TypeGuard


def is_real_number(value: object) -> TypeGuard[RealNumber]:
	return isinstance(value, int) or isinstance(value, float)
```

For more info, see [PEP 647](https://www.python.org/dev/peps/pep-0647/).

## Literal types

For more info, see [PEP 586](https://www.python.org/dev/peps/pep-0586/).

## Final typing qualifier

For more info, see [PEP 591](https://www.python.org/dev/peps/pep-0591/).

## Runtime type annotations

For more info, see [PEP 593](https://www.python.org/dev/peps/pep-0593/).
