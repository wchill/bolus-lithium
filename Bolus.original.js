function renderBattery(height, percentage, charging, low, color) {
    var emptyBarCanvas = document.createElement("canvas"),
        emptyBarContext = emptyBarCanvas.getContext("2d"),
        emptyBarData,
        fullBarCanvas = document.createElement("canvas"),
        fullBarContext = fullBarCanvas.getContext("2d"),
        fullBarData,
        finalCanvas = document.createElement("canvas"),
        finalContext = finalCanvas.getContext("2d"),
        barWidth = height * 1.25,
        radius = Math.round(height / 6) / 2.0,
        padding = Math.round(height / 8),
        totalWidth = barWidth + (charging ? Math.round(0.3 * height) + 2 * padding : padding),
        colorString = "rgb(" + color.join() + ")",
        colorStringAlpha = "rgba(" + color.join() + ",0.3)",
        barData;
    finalCanvas.width = totalWidth;
    finalCanvas.height = height;
    emptyBarCanvas.width = barWidth;
    emptyBarCanvas.height = height;
    fullBarCanvas.width = barWidth;
    fullBarCanvas.height = height;

    function drawPath(ctx) {
        ctx.beginPath();
        ctx.arc(radius, height / 2, radius, 0.5 * Math.PI, 1.5 * Math.PI);
        ctx.lineTo(barWidth - radius / 2, height / 2 - radius);
        ctx.arc(barWidth - radius, height / 2, radius, 1.5 * Math.PI, 0.5 * Math.PI);
        ctx.lineTo(radius / 2, height / 2 + radius);
        ctx.clip();
    }

    drawPath(emptyBarContext);
    emptyBarContext.fillStyle = colorStringAlpha;
    emptyBarContext.fill();
    if (charging) fullBarContext.fillStyle = "#4CD964";
    else if (low) fullBarContext.fillStyle = "#FF3B30";
    else fullBarContext.fillStyle = colorString;
    drawPath(fullBarContext);
    fullBarContext.fill();
    fullBarData = fullBarContext.getImageData(0, 0, barWidth, height);
    finalContext.putImageData(fullBarData, 0, 0);
    barData = emptyBarContext.getImageData(barWidth * (percentage / 100), 0, barWidth, height);
    finalContext.putImageData(barData, barWidth * (percentage / 100), 0);

    if (charging) {
        var lightningCanvas = document.createElement("canvas");
        var lightningContext = lightningCanvas.getContext("2d");
        var lightningBase = 0.75 * height;
        lightningCanvas.width = Math.round(0.4 * lightningBase);
        lightningCanvas.height = Math.round(0.7 * lightningBase);
        lightningContext.strokeStyle = colorString;
        lightningContext.fillStyle = colorString;
        lightningContext.beginPath();
        lightningContext.moveTo(Math.round(0.3 * lightningBase), 0);
        lightningContext.lineTo(Math.round(0.2 * lightningBase), Math.round(0.3 * lightningBase));
        lightningContext.lineTo(Math.round(0.4 * lightningBase), Math.round(0.3 * lightningBase));
        lightningContext.lineTo(Math.round(0.1 * lightningBase), Math.round(0.7 * lightningBase));
        lightningContext.lineTo(Math.round(0.2 * lightningBase), Math.round(0.4 * lightningBase));
        lightningContext.lineTo(0, Math.round(0.4 * lightningBase));
        lightningContext.closePath();
        lightningContext.stroke();
        lightningContext.clip();
        lightningContext.fill();
        var lightningData = lightningContext.getImageData(0, 0, lightningCanvas.width, lightningCanvas.height);
        finalContext.putImageData(lightningData, barWidth + padding, height / 2 - lightningCanvas.height / 2);
    }

    return finalCanvas.toDataURL("image/png");
}
