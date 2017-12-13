function GetRange(start, end, step)
{
  var range = [];
  for (var i = 0; start + i * step <= end; i++)
  {
    range.push(start + i * step);
  }
  return range;
}

function SquareRange(range)
{
  var squaredRange = [];
  for (var i = 0; i < range.length; i++)
  {
    squaredRange.push(Math.pow(range[i], 2));
  }
  return squaredRange;
}

function GetPoint(x, y, i)
{
  var point = {
                data: [{x: [x], y: [y]}],
                mode: 'markers',
                marker: {color: ['#631357'], size: 20},
              };
  return point;
}

function GetGDFrames(steps, initValue, learningRate)
{
  var frames = [];
  frames.push(GetPoint(initValue, Math.pow(initValue, 2), 0));
  var x = initValue;
  for (var i = 0; i <= steps; i++)
  {
    gradient = 2 * x;
    nextValue = x - gradient * learningRate;
    x = nextValue;
    frames.push(GetPoint(x, Math.pow(x, 2), i + 1));
  }
  return frames;
}

function GetLayout()
{
  var layout = {
                xaxis: {range: [-20, 20], zeroline: false},
                yaxis: {range: [-40, 400], zeroline: false},
                showlegend: false
              }
  return layout;
}

function GetData()
{
  var xRange = GetRange(-20, 20, 0.1);
  var yRange = SquareRange(xRange);
  var data = [{x: null,
               y: null, mode: 'markers',
               marker: {color: ['#631357'], size: 20}},
              {x: xRange,
               y: yRange}];
  return data;
}

var stableLayout = GetLayout();
var unstableLayout = GetLayout();
var stableData = GetData();
var unstableData = GetData();
var stableFrames = GetGDFrames(50, 15, 0.1);
var unstableFrames = GetGDFrames(50, 5, 1.2);

Plotly.plot('stable', stableData, stableLayout, {displayModeBar: false, showLink: false}).then(function ()
{
  Plotly.addFrames('stable', stableFrames);
});

button = document.getElementById("compute");
function StartStableAnimation()
{
  var durations = {
                    transition: {duration: 500},
                    frame: {duration: 500},
                    mode: 'immediate'
                  };
  Plotly.animate('stable', null, durations);
}
button.onclick = StartStableAnimation;

Plotly.plot('unstable', unstableData, unstableLayout, {displayModeBar: false, showLink: false}).then(function ()
{
  Plotly.addFrames('unstable', unstableFrames);
});

button = document.getElementById("compute2");
function StartUnstableAnimation()
{
  var durations = {
                    transition: {duration: 500},
                    frame: {duration: 500},
                    mode: 'immediate'
                  };
  Plotly.animate('unstable', null, durations);
}
button.onclick = StartUnstableAnimation;
