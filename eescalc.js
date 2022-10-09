module.exports.averageAeesCalc = averageAeesCalc; module.exports.averageEesCalc = averageEesCalc;

//averageEesCalc(6, 9, 999, [0,5,10])
//
// start of code

// helper function for number of simulations of ees
function averageEesCalc(start, end, simulations, sfp) {
  let sum = 0;
  for (i = 0; i < simulations; i++) {
    sum += eescalc(start, end, sfp)
  }
  res = (sum / simulations).toString()
  console.log("avg ees: " + res)
  console.log("")
  return res
}

// helper function for number of simulations of aees
function averageAeesCalc(start, end, simulations, sfp) {
  let sum = 0;
  for (i = 0; i < simulations; i++) {
    sum += aeescalc(start, end, sfp)
  }
  res = (sum / simulations).toString()
  console.log("avg aees: " + res)
  console.log("")
  return res
}

// actual function for ees
function eescalc(start, end, sfp) {
  let chance = .75 - parseFloat(start) * (.05)
  let counter = 0
  if (!sfp) sfp = [0, 5, 10]
  //console.log("ees" + " start: " + start + " end: " + end + " sfp: " + sfp )

  while (start < end) {
    //console.log("start " + start)
    //pass ee
    if (Math.random(1) <= chance) {
      start += 1
      chance = .75 - parseFloat(start) * (.05)
    }
    //fail ee 
    else if (Math.random(1) > chance) {
      if (!sfp.includes(start)) {
        start -= 1
        chance = .75 - parseFloat(start) * (.05)
        // lowest percentage is capped at 10% 
        if (chance < .1) chance = .1
      }
    }
    counter += 1;
  }
  //console.log(counter)
  return counter;
}
// actual function for aees
function aeescalc(start, end, sfp) {
  let chance = .95 - parseFloat(start) * (.05)
  let counter = 0
  if (sfp === undefined) sfp = [0, 5, 10]
  //console.log("aees" + " start: " + start + " end: " + end + " sfp: " + sfp)

  while (start < end) {
    //console.log(start)
    //pass ee
    if (Math.random(1) <= chance) {
      start += 1
      chance = .95 - parseFloat(start) * (.05)
    }
    //fail ee 
    else if (Math.random(1) > chance) {
      if (!sfp.includes(start)) {
        start -= 1
        chance = .95 - parseFloat(start) * (.05)
        // lowest percentage is capped at 30% 
        if (chance < .3) chance = .3
      }
    }
    counter += 1;
  }
  //console.log(counter)
  return counter
}

//
// end of code

// README
// eescalc.js v1.0 by D
//
// The main purpose of this program is to provide users guidance on whether or not they should
// Use sfp at 8sf, dont use spf at 8sf, if one has enough ees or aees to go to x sf, for ex.
// Simulation-based estimation/calculation of avg. number of ees it takes to go from a to b

// Takes in 3 or 4 parameters, start ees, end ees, number of simulations, and desired sfps
// If no sfp parameter is given, default will be 5 and 10

// Note that no range is given in the code, but ees can range widely from:
// min: 11 ees to avg: 33 ees to high: 55 ees for sfp 0-11 as an example.

// v1.0 by D on October 8, 2022.
