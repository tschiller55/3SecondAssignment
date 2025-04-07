$(document).ready(function () {
    console.log("JQuery is ready!");

    const targetTime = 3000;
    let attempts = [];
    let attemptNumber = 0;

    // sett up chart.js
    const ctx = document.getElementById('attemptsChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'Reaction Time (ms)',
                data: [],
                backgroundColor: [],
                borderColor: 'black',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Attempts'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Time (ms)'
                    }
                }
            }
        }
    });

    let timerStarted = false;
    let startTime, endTime;

    // handle start/stop button click
    $("#startButton").click(function () {
        if (!timerStarted) {
            $(this).text('Stop');
            timerStarted = true;
            startTime = new Date().getTime();
            $("#status").text("Click again after 3 seconds...");
        } else {
            $(this).text('Start');
            timerStarted = false;
            endTime = new Date().getTime();
            let elapsedTime = (endTime - startTime);
            let timeDifference = Math.abs(elapsedTime - targetTime);
            let color = 'red';

            // determine color based on time difference
            if (timeDifference <= 200) {
                color = 'green';
            } else if (timeDifference <= 500) {
                color = 'yellow';
            } else {
                color = 'red';
            }

            // attempt data to chart
            attemptNumber++;
            attempts.push({
                attempt: attemptNumber,
                time: elapsedTime,
                status: color,
                start: startTime,
                end: endTime
            });

            chart.data.labels.push('Attempt ' + attemptNumber);
            chart.data.datasets[0].data.push(elapsedTime);
            chart.data.datasets[0].backgroundColor.push(color);
            chart.update();

            // summary for this attempt
            $("#summary").html(`
                <h4>Attempt #${attemptNumber}</h4>
                <p>Start Time: ${new Date(startTime).toLocaleTimeString()}</p>
                <p>End Time: ${new Date(endTime).toLocaleTimeString()}</p>
                <p>Elapsed Time: ${elapsedTime} ms</p>
                <p>Status: <span style="color:${color};">${color.charAt(0).toUpperCase() + color.slice(1)}</span></p>
            `);
        }
    });

    // jQuery functionality for the button

    $("#startButton").on("mouseenter", function () {
        console.log("Button hovered");
        $(this).addClass("btn-warning");
    });

    $("#startButton").on("mouseleave", function () {
        console.log("Button left");
        $(this).removeClass("btn-warning");
    });
});
