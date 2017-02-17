import { Component, ElementRef } from '@angular/core';
import * as d3 from 'd3';


@Component({
  selector: 'dw-bar-chart',
  templateUrl: './dw-bar-chart.component.html',
  providers: []
})
export class DWBarChart {

  constructor(private elementRef: ElementRef) {

  }

  ngAfterViewInit() {

    var data = [
      {
        country: 'USA',
        value: 267046.9
      },
      {
        country: 'China',
        value: 159107.3
      },
      {
        country: 'Japan',
        value: 76011.7
      },
      {
        country: 'Brazil',
        value: 60775.2
      },
      {
        country: 'Russia',
        value: 50956.1
      },
      {
        country: 'Germany',
        value: 47717.8
      },
      {
        country: 'India',
        value: 42452.4
      }
    ];

    var margin = { top: 20, right: 20, bottom: 40, left: 70 },
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    var x = d3.scaleBand()
      .range([0, width])
      .padding(0.1);

    var y = d3.scaleLinear()
      .range([height, 0]);

    var svg = d3.select(this.elementRef.nativeElement).select('svg')
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
      .attr("height", function (d) { return height - y(d.value); })
      .attr('fill', (d) => { return this.lightenDarkenColor('#3232ff', 100 - (d.value / d3.max(data, function (d) { return d.value; }) * 100)) });

    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    svg.append("g")
      .call(d3.axisLeft(y));

    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Vehicles in Use in 2016");


    svg.append("text")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom - 5)
      .style("text-anchor", "middle")
      .text("Country");

  }


  lightenDarkenColor(col, amt) {
    var usePound = false;
    if (col[0] == "#") {
      col = col.slice(1);
      usePound = true;
    }
    var num = parseInt(col, 16);
    var r = (num >> 16) + amt;
    if (r > 255) {
      r = 255;
    } else if (r < 0) {
      r = 0;
    }
    var b = ((num >> 8) & 0x00FF) + amt;
    if (b > 255) {
      b = 255;
    } else if (b < 0) {
      b = 0;
    }
    var g = (num & 0x0000FF) + amt;
    if (g > 255) {
      g = 255;
    } else if (g < 0) {
      g = 0;
    }
    return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
  }
}
