---
title: "Sumar todos los numeros de 1 a N"
date: "2019-10-29T23:30:00-03:00"
categories: ["Algoritmos", "PHP"]
---

Recientemente hice una prueba en HackerRank y me dí cuenta que no tengo idea de algoritmos.

En el día a día no tengo necesidad de utilizarlos, por lo que cuando el desafío era hacer una función que sume un array de números del 1 a 100 (teniendo como parametros el array y la cantidad de valores del array), lo que hice fue:

```php
function sumAllNumbers(array $array, int $count): int
{
    return array_sum($array);
}
```

Esta función suma uno por uno todos los números y en este caso no es eficiente.

Por esto voy a aprender, *comprender* y compartir los algoritmos que vaya aprendiendo. En este post voy a explicar el que resuelve este problema.

## Sumar todos los numeros de 1 a N

El desafío es simple: siendo `n=100`, <u>sumar todos los números de 1 a N</u>.

En vez de sumar uno por uno, se pueden agrupar en pares sumando el primero y el último de la lista:

```js
(1 + 100) + (2 + 99) + (3 + 98) ... ( 49 + 52 ) + ( 50 + 51 )
```

Cada grupo da como resultado 101, o sea `n+1`. La cantidad de grupos es 50, o sea `n/2`.

Por lo tanto el algoritmo es `(n + 1) * (n / 2)`.


Aplicando este algoritmo, la función queda así:

```php
function sumAllNumbers(array $array, int $count): int
{
    return ($count + 1) * ($count / 2);
}
```
