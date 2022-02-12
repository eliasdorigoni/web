---
title: "Manejo de bits en PHP"
date: "2022-01-09T20:12:00-03:00"
categories: ["PHP"]
draft: true
---

Es raro encontrarse con definiciones basadas en **bits** en el desarrollo web,
y si uno es autodidacta puede costar entenderlo. Escribir scripts para **Arduino**,
donde la memoria escasea y los bits son moneda común, ayudan a romper el hielo.

Conocer cómo manejar bits individualmente es muy útil en muchos escenarios, por
ejemplo para establecer **múltiples estados true / false** de forma más concisa.

Para no explicar los conceptos "al aire" voy a aplicarlos a PHP.

## Notación binaria en PHP

La notación binaria se introdujo en la versión 5.4 de PHP por lo que hoy
en día es seguro de usar. Sin embargo en código viejo y no tan viejo
es normal encontrar los valores definidos en el sistema decimal.
A efectos prácticos, es lo mismo.

```php
4 === 0b100 // true
```

Para definir un número en sistema binario hay que prefijarlo con `0b` (numero cero y letra "b").

```php
0  === 0b0
1  === 0b1
2  === 0b10
3  === 0b11
4  === 0b100
5  === 0b101
6  === 0b110
7  === 0b111
8  === 0b1000
9  === 0b1001
10 === 0b1010
```

La cantidad máxima de bits que puede manejar el sistema la define la arquitectura
del hardware, el sistema operativo y el lenguaje de programación.

Existen 6 **operadores** para trabajar con bits: **AND**, **OR**, **XOR**, **NOT**, **Shift left** y **Shift right**.
Estos operadores se pueden usar tanto en números del sistema binario como el decimal.

## Operador AND (&)
El operador "AND" evalúa dos números y retorna los bits que estén activos
en ambos lados siguiendo la siguiente regla: si ambos bits son 1, retorna 1, de
lo contrario retorna 0.

```markup
0 & 0 === 0
0 & 1 === 0
1 & 0 === 0
1 & 1 === 1
```

Ejemplo de una operación AND:
```markup
1 0 0 1 0 1 &
1 1 0 0 1 1
-----------
1 0 0 0 0 1
```

**¿Dónde se puede usar?** Donde se necesite saber si un bit específico está
activo en un número.

```php
class Product
{
    public const STATUS_ON_SALE = 0b100;

    public function isOnSale(): bool
    {
        return $this->status & self::STATUS_ON_SALE === self::STATUS_ON_SALE;

        /*
        Si `$this->status` fuera `010`, la operación `010 & 100` daría `000` lo
        que evaluaría como `false` porque no es igual a `STATUS_ON_SALE`.

        En cambio si `$this->status` fuera `111` la operación `111 & 100`
        devolvería `100`, que es exactamente el status inicial que se busca.
        */
    }
}
```



## Operador OR (|)
Evalúa 2 números y retorna los bits que estén activos en cualquiera de los lados.

```markup
0 | 0 === 0
0 | 1 === 1
1 | 0 === 1
1 | 1 === 1
```

Ejemplo de una operación OR:
```markup
1 0 0 1 0 1 |
1 1 0 0 1 1
-----------
1 1 0 1 1 1
```

**¿Dónde se puede usar?** Donde se necesite agregar un bit a un número existente.

```php
class Product
{
    public const STATUS_SHIPPED = 0b010;

    public function setAsShipped()
    {
        $this->status = $this->status | self::STATUS_SHIPPED;
    }
}
```

## Operador XOR (^)
Compara 2 números y retorna los bits que estén activos en sólo uno de los lados.

```markup
0 ^ 0 === 0
0 ^ 1 === 1
1 ^ 0 === 1
1 ^ 1 === 0
```

Ejemplo de una operación XOR:

```markup
1 0 0 1 0 1 ^
1 1 0 0 1 1
-----------
0 1 0 1 1 0
```
**¿Dónde se puede usar?** Donde se necesite intercambiar un bit en un número
existente. Honestamente esta operación no se usa mucho.

```php
class Product
{
    public const STATUS_ON_SALE = 0b100;

    public function toggleOnSale()
    {
        $this->status = $this->status ^ self::STATUS_ON_SALE;
    }
}
```


## Operador NOT (~)
Invierte los bits de un número.

```markup
~ 0 = 1
~ 1 = 0
```

```markup
~  1 0 0 1 0 1
--------------
=  0 1 1 0 1 0
```

## Operador "Shift left" (<<)
Desplaza los bits del primer número a la izquierda, tantos lugares como indique el segundo número.

```markup
1 0 0 1 0 1 <<
        1 1
-----------
1 0 0 1 0 1 0 0 0
```

En la práctica duplica el primer número tantas veces como indique el segundo.

Binario
```markup
111 << 110 === 111000000
```

Decimal
```php
7 << 6
= 8 * 2 * 2 * 2 * 2 * 2 * 2
= 448
```


## Operador "Shift right" (>>)
Desplaza los bits del primer número a la derecha, tantos lugares como indique el segundo número.

```markup
1 0 1 0 1 1 1 >>
          1 1
-------------
      1 0 1 0
```

En la práctica divide a la mitad el primer número tantas veces como indique el segundo.

Binario:

```markup
1011000 << 11 = 1011
```

Decimal

```markup
88 >> 3
= 88 / 2 / 2 / 2
= 11
```

## Cierre

Como ves, es fácil si está bien definido.
