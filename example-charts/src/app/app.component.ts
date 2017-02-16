import { Component } from '@angular/core';
import * as d3 from 'd3';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent {

  constructor() {

  }

  ngAfterViewInit() {

    var data = [
      {
        country: 'South Africa',
        value: 250
      },
      {
        country: 'Germany',
        value: 700
      },
      {
        country: 'Russia',
        value: 150
      },
      {
        country: 'Mexico',
        value: 575
      },
      {
        country: 'France',
        value: 375
      }
    ];

    var margin = { top: 20, right: 20, bottom: 30, left: 40 },
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    var x = d3.scaleBand()
      .range([0, width])
      .padding(0.1);

    var y = d3.scaleLinear()
      .range([height, 0]);

    var svg = d3.select("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

    x.domain(data.map(function (d) { return d.country; }));
    y.domain([0, d3.max(data, function (d) { return d.value; })]);

    svg.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function (d) { return x(d.country); })
      .attr("width", x.bandwidth())
      .attr("y", function (d) { return y(d.value); })
      .attr("height", function (d) { return height - y(d.value); });

    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    svg.append("g")
      .call(d3.axisLeft(y));

  }
}
