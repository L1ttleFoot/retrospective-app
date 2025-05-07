import * as d3 from 'd3';
import {useEffect, useRef, useState} from 'react';
import {axisBottom, max} from 'd3';

export const Chart = ({width = 800, height = 500}) => {
    const svgRef = useRef(null);
    const [tooltipData, setTooltipData] = useState<{value: number | null}>({value: null});
    const [tooltip, setTooltip] = useState(false);
    const [position, setPosition] = useState({x: 0, y: 0});

    const data = [
        {emoji: '😀', count: 30},
        {emoji: '😎', count: 80},
        {emoji: '😊', count: 45},
        {emoji: '😂', count: 60},
        {emoji: '😜', count: 20},
        {emoji: '😍', count: 90},
    ];

    const margin = {
        top: 30,
        right: 15,
        bottom: 20,
        left: 15,
    };

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    useEffect(() => {
        const svg = d3
            .select(svgRef.current)
            .attr('width', width)
            .attr('height', height)
            .style('background', '#d3d3d3')
            .style('overflow', 'visible');

        svg.selectAll('*').remove();

        const chart = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

        const xScale = d3
            .scaleBand()
            .domain(data.map((d) => d.emoji))
            .range([margin.left, innerWidth])
            .padding(0.3);

        const yScale = d3
            .scaleLinear()
            .domain([0, max(data, (d) => d.count) ?? 0])
            .nice()
            .range([innerHeight, 0]);

        chart
            .append('g')
            .attr('class', 'x-axis')
            .attr('transform', `translate(0,${innerHeight})`)
            .call(axisBottom(xScale));

        chart
            .append('g')
            .attr('class', 'y-axis')
            .attr('transform', `translate(${margin.left},0)`)
            .call(d3.axisLeft(yScale));

        chart
            .selectAll('.bar')
            .data(data)
            .join('rect')
            .attr('class', 'bar')
            .attr('rx', 12)
            .attr('x', (d) => xScale(d.emoji)!)
            .attr('y', innerHeight)
            .attr('width', xScale.bandwidth())
            .attr('height', 0)
            //.transition()
            //.delay((_, i) => i * 80)
            //.duration(0) //800
            .attr('y', (d) => yScale(d.count))
            .attr('height', (d) => innerHeight - yScale(d.count))
            .attr('fill', '#52b788');

        chart
            .selectAll('.label')
            .data(data)
            .join('text')
            .attr('class', 'label')
            .attr('x', (d) => xScale(d.emoji)! + xScale.bandwidth() / 2)
            .attr('y', innerHeight - 5)
            .attr('text-anchor', 'middle')
            .text((d) => d.count)
            .style('font-size', '18px')
            .style('fill', '#333')
            .transition()
            //.delay((_, i) => i * 80)
            .duration(0) //800
            .attr('y', (d) => yScale(d.count) - 5);

        chart
            .selectAll('.bar-area')
            .data(data)
            .join('rect')
            .attr('class', 'bar-area')
            .attr('rx', 12)
            .attr('x', (d) => xScale(d.emoji)! - 10)
            .attr('y', -10)
            .attr('width', xScale.bandwidth() + 20)
            .attr('height', innerHeight + 10)
            .attr('fill', '#52b788')
            .style('opacity', 0)
            .on('mouseenter', function (event, d) {
                d3.select(this).style('opacity', 0).transition().duration(0).style('opacity', 0.2);
                setTooltip(true);
                setPosition({x: event.clientX, y: event.clientY});
                setTooltipData({value: d.count});
            })
            .on('mouseleave', function () {
                d3.select(this).style('opacity', 0.2).transition().duration(0).style('opacity', 0);
                console.log('mouseleave');
                setTooltip(false);
                setPosition({x: 0, y: 0});
                setTooltipData({value: null});
            });
    }, [data]);

    console.log(position, tooltip);

    return (
        <>
            <svg ref={svgRef}></svg>
            {tooltip && (
                <div
                    style={{
                        position: 'absolute',
                        top: Math.min(position.y - 30, innerHeight - 50),
                        left: Math.min(position.x + 20, innerWidth - 50),
                        background: 'white',
                        padding: '5px',
                        border: '1px solid #ccc',
                        pointerEvents: 'none',
                    }}
                >
                    {tooltipData.value}
                </div>
            )}
        </>
    );
};
