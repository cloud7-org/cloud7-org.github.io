class MeasureText
{
    static calc = (text, elementName = 'span') => {
        const measureRef = document.createElement(elementName);
        measureRef.classList.add('measure-ref', 'position-absolute');
        document.body.appendChild(measureRef);

        measureRef.textContent = text;
        const {width, height} = measureRef.getBoundingClientRect();

        var style = window.getComputedStyle(measureRef, null).getPropertyValue('font-size');
        var fontSize = parseFloat(style); 

        document.body.removeChild(measureRef);

        return {width, height, fontSize};
    }
}

export default MeasureText;