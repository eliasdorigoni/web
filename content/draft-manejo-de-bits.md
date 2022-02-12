---
title: "Manejo de bits en PHP"
date: "2022-01-09T20:12:00-03:00"
categories: ["PHP"]
draft: true
---

Es muy poco frecuente encontrarse con definiciones basadas en bits en el desarrollo
web, y si uno es autodidacta puede costar entenderlo. Actividades como el desarrollo
para Arduino ayudan enormemente, donde la memoria escasea y los bits son moneda común.

Conocer cómo manejar bits individualmente es muy útil en muchos escenarios, por
ejemplo para establecer múltiples estados true / false de forma más concisa.

La notación binaria se introdujo en la versión 5.4 de PHP, así que es seguro
de usar. Para definir un valor, hay que prefijarlo con `0b`.

```
Decimal | Binario | Notación PHP
------- | ------- | ------------
0       | 0       | 0b0
1       | 1       | 0b1
2       | 10      | 0b10
3       | 11      | 0b11
4       | 100     | 0b100
5       | 101     | 0b101
6       | 110     | 0b110
7       | 111     | 0b111
8       | 1000    | 0b1000
9       | 1001    | 0b1001
10      | 1010    | 0b1010
```

La longitud máxima de bits que puede existir en un número está dada por la arquitectura
del hardware y el sistema operativo, generalmente 64 bits o 32 bits.

## Operadores

Existen 6 operadores para trabajar con bits:

- AND
- OR
- XOR
- NOT
- Shift left
- Shift right

Estos operadores se pueden usar tanto en números del sistema binario como el decimal.

### AND (&)
El operador "AND" evalúa los bits de 2 números y retorna los bits que estén activos
en ambos lados siguiendo la siguiente regla: si ambos bits son 1, retorna 1, de
lo contrario retorna 0.

```markup
0 & 0 == 0
0 & 1 == 0
1 & 0 == 0
1 & 1 == 1
```

Ejemplo:
```markup
1 0 0 1 0 1
1 1 0 0 1 1
-----------
1 0 0 0 0 1
```

**¿Dónde se puede usar?** Donde se necesite saber si un bit está activo en otro número.

```php
function productIsShipped(Product $product): bool
{
    $shippedStatus = 0b100;
    return $product->status & $shippedStatus === $shippedStatus;
}
```

Si status fuera `010`, la operación `010 & 100` daría `000` lo que evaluaría como false. En cambio si status fuera `111`
la operación `111 & 100` devolvería `100`, que es exactamente el status inicial que se busca.

### OR (|)
Evalúa 2 números y retorna los bits que estén activos en cualquiera de los lados.

```markup
0 | 0 == 0
0 | 1 == 1
1 | 0 == 1
1 | 1 == 1
```

Ejemplo (nota: el punto en la primer línea es para formatear):
```markup
.  1 0 0 1 0 1
|  1 1 0 0 1 1
--------------
=  1 1 0 1 1 1
```

**¿Dónde se puede usar?** Donde se necesite agregar un bit a un número existente.

```php
function productSetShipped(Product $product): Product
{
    $shippedStatus = 0b100;
    $product->status = $product->status | $shippedStatus;
    return $product;
}
```

### XOR (^)
Compara 2 números y retorna los bits que estén activos en sólo uno de los lados.

```markup
0 ^ 0 = 0
0 ^ 1 = 1
1 ^ 0 = 1
1 ^ 1 = 0
```


```markup
.  1 0 0 1 0 1
^  1 1 0 0 1 1
--------------
=  0 1 0 1 1 0
```

### NOT (~)
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

### Shift left (<<)

Desplaza los bits del primer número a la izquierda, tantos lugares como indique el segundo número.

```markup
   1 0 0 1 0 1
<<         1 1
------------------
=  1 0 0 1 0 1 0 0 0
```

En la práctica duplica el primer número tantas veces como indique el segundo.

```markup
// Binario
111 << 110 = 111000000

// Decimal
7 << 6
= 8 * 2 * 2 * 2 * 2 * 2 * 2
= 448
```


### Shift right
Su símbolo es `>>`. Desplaza los bits del primer número a la derecha (es decir que agrega ceros a la izquierda), tantos lugares como indique el segundo número.

```markup
   1 0 1 1 0 0 0
>>           1 1
----------------
         1 0 1 1
```

En la práctica divide a la mitad el primer número tantas veces como indique el segundo.

```markup
// Binario
1011000 << 11 = 1011

// Decimal
88 >> 3
= 88 / 2 / 2 / 2
= 448
```


## Ejemplo práctico



```php
class WaterBottle
{
    const HAS_CAP   = 0b1;
    const HAS_WATER = 0b10;
    const IS_FULL   = 0b100;

    private $status = 0;

    function __construct(int $status = 0)
    {
        $this->status = $status;
    }

    public function hasCap(): bool
    {
        return ($this->status & self::HAS_CAP) === self::HAS_CAP;
    }

    public function hasWater(): bool
    {
        return ($this->status & self::HAS_WATER) === self::HAS_WATER;
    }

    public function isFull(): bool
    {
        return ($this->status & self::IS_FULL) === self::IS_FULL;
    }
}


$bottle = new WaterBottle(0b110);
$bottle->hasCap(); // false
$bottle->hasWater(); // true
$bottle->isFull(); // true
```


Por temas de retrocompatibilidad, es normal ver código que define los bits como decimales.
```php
class WaterBottle
{
    const HAS_CAP   = 1;
    const HAS_WATER = 2;
    const IS_FULL   = 4;

    // ...
}
```
