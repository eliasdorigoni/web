// https://stackoverflow.com/questions/610406/javascript-equivalent-to-printf-string-format
if (!String.format) {
    String.format = function(format) {
      var args = Array.prototype.slice.call(arguments, 1);
      return format.replace(/{(\d+)}/g, function(match, number) { 
        return typeof args[number] != 'undefined'
          ? args[number] 
          : match
        ;
      });
    };
  }

(function() {
    function actualizarColor() {
        var r = sliderR.value,
            g = sliderG.value,
            b = sliderB.value

        colorR.setAttribute('fill', 'rgb(' + r + ',0,0)');
        colorG.setAttribute('fill', 'rgb(0,' + g + ',0)');
        colorB.setAttribute('fill', 'rgb(0,0,' + b + ')');
        colorRGB.setAttribute('fill', String.format('rgb({0},{1},{2})', r, g, b));
        textoR.innerHTML = String.format('R:{0}', r)
        textoG.innerHTML = String.format('G:{0}', g)
        textoB.innerHTML = String.format('B:{0}', b)
    }

    var wrapper = document.getElementById("sliders-colores")
    var sliderR = wrapper.querySelector('.slider-R'),
        sliderG = wrapper.querySelector('.slider-G'),
        sliderB = wrapper.querySelector('.slider-B'),

        colorR = wrapper.querySelector('.color-R'),
        colorG = wrapper.querySelector('.color-G'),
        colorB = wrapper.querySelector('.color-B'),

        textoR = wrapper.querySelector('.texto-R'),
        textoG = wrapper.querySelector('.texto-G'),
        textoB = wrapper.querySelector('.texto-B'),

        colorRGB = wrapper.querySelector('.color-RGB')

    sliderR.addEventListener('input', actualizarColor)
    sliderG.addEventListener('input', actualizarColor)
    sliderB.addEventListener('input', actualizarColor)


    var sliderUnidadDecimal = document.getElementById('conversion-sistemas'),
        unidadBin = document.getElementById('conversion-bin'),
        unidadDec = document.getElementById('conversion-dec'),
        unidadHex = document.getElementById('conversion-hex')

    function convertirUnidades() {
        unidadDec.innerHTML = this.value
        unidadBin.innerHTML = Math.abs(this.value).toString(2)
        unidadHex.innerHTML = Math.abs(this.value).toString(16)
    }
    sliderUnidadDecimal.addEventListener('input', convertirUnidades)
})()
