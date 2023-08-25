---
title: Uncommon Python Type Hints for Special Cases
date: 2023-08-25T11:37:52.768Z
description: An overview of special Python type hints, created to enable type hinting of edge-cases in code and complex modules.
---

## Introduction

Python is great at being a dynamically and strongly-typed programming language. However, once you get enough mileage working with large Python codebases, you'll probably realize that dyanmic types can be confusing, cause bugs, and result in unexpected behavior. The folks maintaining Python realized this as well, and decided to implement a built-in way to add static type annotations in Python (see [PEP 484](https://www.python.org/dev/peps/pep-0484/)).

7 years have passed since then, and type hinting in Python has matured and evolved, with new features being implemented in every new Python version. In this post, I wanted to go over some of the more advanced and newly added features, with the hopes that you will find them useful and integrate them into your codebase.

> A basic knowldge of type hinting in Python is assumed. If you need a refresher, I recommend [this guide from Real Python](https://realpython.com/python-type-checking/).

## Parameter specification variables

Let's imagine you'd like to write a simple decorator, which will print a message every time a method is called:

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

> In case you aren't familiar with [`TypeVar`](https://docs.python.org/3/library/typing.html#typing.TypeVar), a type variable lets you refer to the same type in multiple places without specifying the exact type.
>
> In the code snippet above, a type variable was used in the `log` method type signature to annotate that the decorated method's return type is the same as that of `func`.

The following call to `add` is invalid, and one would expect type checkers to report it as an error, however it will only fail at runtime:

```python
add(1, 'a')  # Fails at runtime
```

This is because the the decorated `add` has the typing `Callable[..., int]` (with `...` meaning arguments aren't validated). [PEP 612](https://www.python.org/dev/peps/pep-0612/) addresses this issue by introducing `ParamSpec`. `ParamSpec` variables are a new type of type variables, used for defining the dependencies between different callables (such as decorators and the decorated method).

Using `ParamSpec`, we can modify the example above to enforce the parameters types of the decorated method, while maintaining the decorator's flexibility:

```python{1,3,7-8}
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

_This feature was shipped in Python 3.10._

## User-defined type guards

Let's assume you're writing a utility method, validating that an object is of a desired type (used for [type narrrowing](https://mypy.readthedocs.io/en/latest/type_narrowing.html)):

```python
from typing import Union

RealNumber = Union[int, float]


def is_real_number(value: object) -> bool:
	return isinstance(value, int) or isinstance(value, float)


def print_value_type(value: object):
	if is_real_number(value):
		assert value == value.real  # Error: invalid type
```

The above code is valid, however static type checkers will report an error. This is because a type checker doesn't have enough information to verify that `value` is a number. Using `TypeGuard`, introduced in [PEP 647](https://www.python.org/dev/peps/pep-0647/), we can enable type narrowing by changing the return type hint of `is_real_numeber` to `TypeGuard[RealNumber]`. This will signal to type checkers that if the method returns `True`, `value` is of type `RealNumber` (and if it returns `False`, it isn't). Now, type checkers won't report any errors:

```python{1,6}
from typing import Union, TypeGuard

RealNumber = Union[int, float]


def is_real_number(value: object) -> TypeGuard[RealNumber]:
	return isinstance(value, int) or isinstance(value, float)


def print_value_type(value: object):
	if is_real_number(value):
		assert value == value.real
```

_This feature was shipped in Python 3.10._

## Type hints for dictionaries with a fixed set of keys

Let's assume we'd like to describe a person using a dictionary:

```python
person = {
	'name': 'Bob',
	'age': 32
}
```

The dictionary's keys should be strings, but we don't want to constrain the types its values. The type hint `Dict[str, Any]` (or `dict[str, Any`] in Python 3.9 and later - see [`GenericAlias`](https://docs.python.org/3/library/stdtypes.html#types-genericalias)). This is better than nothing, but doesn't really enforce our requirements for what the person dictionary should look like.

Using `TypedDict`, introduced in [PEP 589](https://www.python.org/dev/peps/pep-0589/), we can now enforce the specific key name and value types in the dictionary:

```python
from typing import TypedDict


class Person(TypedDict):
	name: str
	age: int
```

Now, a type checker will recognize and enforce the typing of the values (and keys) of `Person` dictionaries:

```python
person: Person = {
	'name': 'Bob',
	'age': 32
}
# Or even:
person = Person(name='Bob', age=32)
```

_This feature was shipped in Python 3.8._

## Self type hint

Let's assume we're developing a program which keeps track of blockchain transactions. A transaction might be represented using this simple interface:

```python
from abc import ABC
from typing import List


class Transaction(ABC):
	def __init__(self, parents: List["Transaction"]):
		self.parents = parents
```

For Bitcoin transactions, for example, we could implement `BitcoinTransaction`:

```python
class BitcoinTransaction(Transaction):
    def __init__(self, sender: str, recipient: str, parents: List["Transaction"]):
        super().__init__(parents)
        self.sender = sender
        self.recipient = recipient
```

Usage of `BitcoinTransaction` would look like so:

```python
parent = BitcoinTransaction(sender="Alice", recipient="Bob", parents=[])
transaction = BitcoinTransaction(sender="Bob", recipient="Alice", parents=[parent])
# Rejected by the type checker:
print(f"The parent sender is {transaction.parents[0].sender}")
```

We received a type checking error because as far as the type checker is concerned, the type of `transaction.parents[0]` is `Transaction`, not `BitcoinTransaction`. To fix this, we can use `Self`:

```python
from abc import ABC
from typing import List, Self


class Transaction(ABC):
    def __init__(self, parents: List[Self]):
        self.parents = parents

class BitcoinTransaction(Transaction):
    def __init__(self, sender: str, recipient: str, parents: List[Self]):
        super().__init__(parents)
        self.sender = sender
        self.recipient = recipient


parent = BitcoinTransaction(sender="Alice", recipient="Bob", parents=[])
transaction = BitcoinTransaction(sender="Bob", recipient="Alice", parents=[parent])
print(f"The parent sender is {transaction.parents[0].sender}")
```

_This feature was shipped in Python 3.11._

## Conclusion

The type hinting features we've explored should enable you to apply type checking to new categories of Python code, which previously couldn't benefit from automated type checking. I hope this post will inspire you to write code that is more declarative, documented and reliable.
