/**
 * Created by daniel.cluff on 5/30/16.
 */
var crowdControlCalc = (function() {
    "use strict";

    var calculator = {};

    calculator.calculateCrowdControlChange = function(input) {
        //calculate output here

        // function calcTimeline 
        // Parameter: array of effects on a player
        // Output: The slice in the timeline where all effects have fallen off of a user
        function calcTimeline(effectArray) {
            var timelineEnd = 0;

            for (var x = 0; x < effectArray.length; x++) {
                var effectEnd = effectArray[x][0] + effectArray[x][1];
                if (effectEnd > timelineEnd) {
                    timelineEnd = effectEnd;
                }
            }

            return timelineEnd;
        }

        // Declare variables for use in calculations
        var endTime = calcTimeline(input), // store the total length of all effects
        	outputData = [], // output array
        	prevHighest = 0, // used to determine if there is a change in priority in a given time slice
            highestRunning = 0, // used to store the highest priority effect active in a given time slice
            effectEndTime; // used to calculate the timeline ending time for a given effect

        // loop through the length of the timeline of effects
        for (var x = 0; x <= endTime; x++) {
            highestRunning = 0;

            // loop through the applied effects
            for (var i = 0; i < input.length; i++) {
                var item = input[i];
                effectEndTime = (item[0] + item[1]) - 1;

                // if effect is active during this time slice - check if it is the highest priority
                if (item[0] <= x && effectEndTime >= x) {
                    if (item[2] > highestRunning) {
                        highestRunning = item[2]
                    }
                }

            }

            // if the output array is empty AND there are no effects running
            if (!(outputData.length === 0 && highestRunning === 0))

            	// if there is a change in effect priority between current time slide and previous time slice
            	// add the time and effect priority to the output array
                if (prevHighest != highestRunning) {
                    outputData.push([x, highestRunning]);
                    prevHighest = highestRunning;
                }

        }
        // return output array of [time, effect] values
        return outputData;
    };

    calculator.outputDataTable = function(data) {
        // build output table
        var outputTable = "<table>";
        outputTable += "<tr><th>Time</th><th>Priority</th></tr>";
        data.forEach(function(item) {
            outputTable += "<tr><td>" + item[0] + "</td><td>" + item[1] + "</td></tr>"
        });
        outputTable += "</table>"

        // inject output table into the div with class outputTable
        document.querySelector('.outputTable').innerHTML = outputTable;

    }

    calculator.outputDataTimeline = function(data) {

        var len = outputData.length;
        var timelineEnd = outputData[len - 1][0];
        var timelineOutput = '';

        for (var x = 0; x <= timelineEnd; x++) {
            timelineOutput += '<div class="timeline item' + x + '">'
            timelineOutput += '<div class="tick">' + x + '</div>';
            outputData.forEach(function(item) {
                if (item[0] === x) {
                    timelineOutput += item[1];
                }
            });
            timelineOutput += '</div>';
        }

        document.querySelector('.timelineOutput').innerHTML = timelineOutput;
    }


    return calculator;
}());
