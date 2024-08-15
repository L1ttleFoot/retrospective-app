import * as d3 from 'd3';
import {useEffect, useRef} from 'react';

export const TestPage = ({width = 600, height = 150}) => {
    const ref = useRef(null);

    const data = [25, 50, 10, 18, 5, 22];

    const margins = {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
    };

    const innerWidth = width - margins.left - margins.right;
    const innerHeight = height - margins.top - margins.bottom;

    useEffect(() => {
        const svg = d3
            .select(ref.current)
            .attr('width', width)
            .attr('height', height)
            .style('background', '#d3d3d3')
            .style('padding-left', 20);

        const xScale = d3
            .scaleLinear<number>()
            .domain([0, data.length - 1])
            .range([margins.left, innerWidth]);

        const yScale = d3
            .scaleLinear<number>()
            .domain([0, Math.max(...data)])
            .range([innerHeight, margins.bottom]);

        const line = d3
            .line<number>()
            .x((_, i) => xScale(i))
            .y((d) => yScale(d))
            .curve(d3.curveCardinal);

        const xAxis = d3
            .axisBottom(xScale)
            .ticks(data.length)
            .tickFormat((i) => `${+i + 1}`);
        const yAxis = d3.axisLeft(yScale).ticks(5);

        svg.append('g').call(xAxis).attr('transform', `translate(0, ${innerHeight})`);
        svg.append('g').call(yAxis).attr('transform', `translate(${margins.left}, 0)`);

        svg.selectAll('.line')
            .data([data])
            .join('path')
            .attr('d', (d) => line(d))
            .attr('fill', 'none')
            .attr('stroke', 'blue');
    }, [data]);

    return <svg ref={ref}></svg>;
};
