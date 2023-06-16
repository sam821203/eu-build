function countDownOutside() {
  var countdownTimeM = Array.apply(
    null,
    document.querySelectorAll(".data__time--sec")
  );

  countdownTimeM.forEach(function (e) {
    var dataTimeMicro = e.getAttribute("data-time");
    var n = new Date(dataTimeMicro);
    var t = [
      "dayTens",
      "dayUnits",
      "hourTens",
      "hourUnits",
      "minTens",
      "minUnits",
      "secTens",
      "secUnits"
    ];

    var r = setIntervalFix(function () {
      var r = countDownNumber(n, true);
      t.forEach(function (n) {
        var t = e.querySelector("." + n);
        t.innerHTML = r[n];
      });
    }, 20);
  });

}

function setIntervalFix(callback, tick) {
  var countIndex = 1;
  var tick = tick || 1000;
  var callback = callback || undefined;
  var stopCountId;
  var startTime = new Date().getTime();
  startCount(tick);

  function startCount(timeInterval) {
    var countId = setTimeout(function () {
      var endTime = new Date().getTime();
      var deviation = endTime - (startTime + countIndex * tick);
      if (typeof callback === "function") {
        callback();
      }
      countIndex++;
      startCount(tick - deviation);
    }, timeInterval);
    return (stopCountId = countId);
  }
  return stopCountId;
}

function countDownNumber(targetDate, isDay) {
  var timeNow = new Date().getTime();
  var targetTime = new Date(targetDate).getTime();
  var isDay = isDay || false;
  var countDownTime = targetTime - timeNow;
  var microseconds = Math.floor(countDownTime / 10);
  var seconds = Math.floor(countDownTime / 1000);
  var min = Math.floor(seconds / 60);
  var hour = Math.floor(min / 60);
  var day = Math.floor(hour / 24);

  hour %= 24;
  min %= 60;
  seconds %= 60;
  microseconds %= 100;

  if (!isDay) hour += day * 24;

  if (countDownTime <= 0) {
    return {
      day: "00",
      dayTens: "0",
      dayUnits: "0",
      hour: "00",
      hourTens: "0",
      hourUnits: "0",
      min: "00",
      minTens: "0",
      minUnits: "0",
      sec: "00",
      secTens: "0",
      secUnits: "0",
      micro: "00",
      microTens: "0",
      microUnits: "0",
    };
  } else if (isNaN(countDownTime)) {
    return console.error("countDownTime is NaN，找不到目標時間");
  } else {
    return {
      // Tens：十位數、Units：個位數，e.g. dayTens：日期的十位數
      day: day < 10 ? "0" + day : day.toString(),
      dayTens: parseInt((day % 100) / 10).toString(),
      dayUnits: parseInt(day % 10).toString(),
      hour: hour < 10 ? "0" + hour : hour.toString(),
      hourTens: parseInt((hour % 100) / 10).toString(),
      hourUnits: parseInt(hour % 10).toString(),
      min: min < 10 ? "0" + min : min.toString(),
      minTens: parseInt((min % 100) / 10).toString(),
      minUnits: parseInt(min % 10).toString(),
      sec: seconds < 10 ? "0" + seconds : seconds.toString(),
      secTens: parseInt((seconds % 100) / 10).toString(),
      secUnits: parseInt(seconds % 10).toString(),
      micro: microseconds < 10 ? "0" + microseconds : microseconds.toString(),
      microTens: parseInt((microseconds % 100) / 10).toString(),
      microUnits: parseInt(microseconds % 10).toString(),
    };
  }
}
window.addEventListener("load", function() {
  countDownOutside();
})