---
title: Cool new Python typing features
date: 2022-01-18T22:13:46.273Z
description: Interesting typing features released in Python 3.8 and later, which you can use today to find more bugs during development and ship better code.
---

TODO: Add Python version in which each feature was added.
TODO: Add note about `Any` vs. `object` - https://stackoverflow.com/a/39817126
TODO: Mention @overload?

## Introduction

Python is great at being a dynamically and strongly-typed programming language. However, once you get enough mileage working with large Python codebases, you'll probably realize that dyanmic types can be confusing, cause bugs, and result in unexpected behavior. The folks maintaining Python realized this as well, and decided to implement a built-in way to add static type annotations in Python (see [PEP 484](https://www.python.org/dev/peps/pep-0484/)).

7 years have passed since then, and type hinting in Python has improved, with new features being implemented in every new Python version. In this post, I wanted to go over some of the newly added features, with the hopes that you will find them useful and integrate them into your codebase.

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

This is because the the decorated `add` has the typing `Callable[..., int]` (with `...` meaning arguments aren't validated). [PEP 612](https://www.python.org/dev/peps/pep-0612/) addresses this issue by introducing `ParamSpec`. `ParamSpec` variables are a new type of type variables, used for defining the dependencies between different callables (such as decorators and the decorated method).

Using `ParamSpec`, we can modify the example above to enforce the parameters types of the decorated method, while maintaining the decorator's flexibility:

```python{1,3-4,7-8}
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

The above code is valid, however static type checkers will report an error. This is because a type checker doesn't have enough information to verify that the type of `value` is `RealNumber`. Using `TypeGuard`, introduced in [PEP 647](https://www.python.org/dev/peps/pep-0647/), we can enable type narrowing by changing the return type hint of `is_real_numeber` to `TypeGuard[RealNumber]`. This will signal to type checkers that if the method returns `True`, `value` is of type `RealNumber` (and if it returns `False`, it isn't). Now, type checkers won't report any errors:

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
person = {'name': 'Itai',
		  'age': 19}
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
person: Person = {'name': 'Itai',
				  'age': 19}
# Or even:
person = Person(name='Itai', age=19)
```

_This feature was shipped in Python 3.8._

## Worthy mentions

Here are some features I decided not to cover in this article, to keep it short and light:

- `Protcol` - you can read more about protocols [here](https://adamj.eu/tech/2021/05/18/python-type-hints-duck-typing-with-protocol/) and in [PEP 544](https://www.python.org/dev/peps/pep-0544/).
- `Generic` - you can read more about generics [here](https://mypy.readthedocs.io/en/latest/generics.html) and in [PEP 585](https://www.python.org/dev/peps/pep-0585/).
- `Final` - you can read more about finals [here](https://mypy.readthedocs.io/en/stable/final_attrs.html) and in [PEP 591](https://www.python.org/dev/peps/pep-0591/).
- `Literal` - you can read more about literals [here](https://mypy.readthedocs.io/en/stable/literal_types.html) and in [PEP 586](https://www.python.org/dev/peps/pep-0586/).
- `Annotated` - you can read more about function and variable annotations [here]() and in [PEP 593](https://www.python.org/dev/peps/pep-0593/).

<!-- - `TypedDict`- you can read more about typed dictionaries [here](https://adamj.eu/tech/2021/05/10/python-type-hints-how-to-use-typeddict/) and in [PEP 589](https://www.python.org/dev/peps/pep-0589/). -->
