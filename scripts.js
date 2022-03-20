const w = 1000;
const h = 650;

const svg = d3.select('svg').attr('width', w).attr('height', h);
let stateData;

svg
  .append('rect')
  .attr('fill', 'rgb(200, 200, 240)')
  .attr('width', 20)
  .attr('height', 15)
  .attr('x', 700)
  .attr('y', 40);

svg
  .append('rect')
  .attr('fill', 'black')
  .attr('width', 1)
  .attr('height', 18)
  .attr('x', 700)
  .attr('y', 40);

svg
  .append('text')
  .text('3%')
  .attr('x', 695)
  .attr('y', 65)
  .style('font-size', '0.5rem');

svg
  .append('rect')
  .attr('fill', 'rgb(170, 170, 240)')
  .attr('width', 20)
  .attr('height', 15)
  .attr('x', 720)
  .attr('y', 40);

svg
  .append('rect')
  .attr('fill', 'black')
  .attr('width', 1)
  .attr('height', 18)
  .attr('x', 720)
  .attr('y', 40);

svg
  .append('text')
  .text('12%')
  .attr('x', 715)
  .attr('y', 65)
  .style('font-size', '0.5rem');

svg
  .append('rect')
  .attr('fill', 'rgb(130, 130, 240)')
  .attr('width', 20)
  .attr('height', 15)
  .attr('x', 740)
  .attr('y', 40);

svg
  .append('rect')
  .attr('fill', 'black')
  .attr('width', 1)
  .attr('height', 18)
  .attr('x', 740)
  .attr('y', 40);

svg
  .append('text')
  .text('21%')
  .attr('x', 735)
  .attr('y', 65)
  .style('font-size', '0.5rem');

svg
  .append('rect')
  .attr('fill', 'rgb(110, 110, 240)')
  .attr('width', 20)
  .attr('height', 15)
  .attr('x', 760)
  .attr('y', 40);

svg
  .append('rect')
  .attr('fill', 'black')
  .attr('width', 1)
  .attr('height', 18)
  .attr('x', 760)
  .attr('y', 40);

svg
  .append('text')
  .text('30%')
  .attr('x', 755)
  .attr('y', 65)
  .style('font-size', '0.5rem');

svg
  .append('rect')
  .attr('fill', 'rgb(90, 90, 240)')
  .attr('width', 20)
  .attr('height', 15)
  .attr('x', 780)
  .attr('y', 40);

svg
  .append('rect')
  .attr('fill', 'black')
  .attr('width', 1)
  .attr('height', 18)
  .attr('x', 780)
  .attr('y', 40);

svg
  .append('text')
  .text('39%')
  .attr('x', 775)
  .attr('y', 65)
  .style('font-size', '0.5rem');

svg
  .append('rect')
  .attr('fill', 'rgb(70, 70, 240)')
  .attr('width', 20)
  .attr('height', 15)
  .attr('x', 800)
  .attr('y', 40);

svg
  .append('rect')
  .attr('fill', 'black')
  .attr('width', 1)
  .attr('height', 18)
  .attr('x', 800)
  .attr('y', 40);

svg
  .append('text')
  .text('48%')
  .attr('x', 795)
  .attr('y', 65)
  .style('font-size', '0.5rem');

svg
  .append('rect')
  .attr('fill', 'rgb(50, 50, 240)')
  .attr('width', 20)
  .attr('height', 15)
  .attr('x', 820)
  .attr('y', 40);

svg
  .append('rect')
  .attr('fill', 'black')
  .attr('width', 1)
  .attr('height', 18)
  .attr('x', 820)
  .attr('y', 40);

svg
  .append('text')
  .text('57%')
  .attr('x', 815)
  .attr('y', 65)
  .style('font-size', '0.5rem');

svg
  .append('rect')
  .attr('fill', 'black')
  .attr('width', 1)
  .attr('height', 18)
  .attr('x', 840)
  .attr('y', 40);

svg
  .append('text')
  .text('66%')
  .attr('x', 835)
  .attr('y', 65)
  .style('font-size', '0.5rem');

fetch(
  'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json'
)
  .then(async res => {
    await fetch(
      'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json'
    )
      .then(res => res.json())
      .then(data => (stateData = data));
    return res.json();
  })
  .then(data => {
    const path = d3.geoPath();

    const counties = topojson.feature(data, data.objects.counties).features;
    svg
      .selectAll('.county')
      .data(counties)
      .enter()
      .append('path')
      .attr('class', 'county')
      .attr('d', path)
      .attr('transform', 'scale(0.9)')
      .attr('transform', 'translate(50,25)')
      .attr('data-id', d => d.id)
      .attr('data-state', d => {
        let el = stateData.find(el => el.fips === d.id);
        return el.state;
      })
      .attr('data-areaname', d => {
        let el = stateData.find(el => el.fips === d.id);
        return el.area_name;
      })
      .attr('data-bachelorsOrHigher', d => {
        let el = stateData.find(el => el.fips === d.id);
        return el.bachelorsOrHigher;
      });
  })
  .then(() => {
    const states = document.getElementsByClassName('county');
    for (let i = 0; i < states.length; i++) {
      const data = states[i].getAttribute('data-bachelorsOrHigher');

      states[i].setAttribute(
        'fill',
        `${
          data < 12
            ? 'rgb(200, 200, 240)'
            : data >= 12 && data < 21
            ? 'rgb(170, 170, 240)'
            : data >= 21 && data < 30
            ? 'rgb(130, 130, 240)'
            : data >= 30 && data < 39
            ? 'rgb(110, 110, 240)'
            : data >= 39 && data < 48
            ? 'rgb(90, 90, 240)'
            : data >= 48 && data < 57
            ? 'rgb(70, 70, 240)'
            : data >= 57 && data < 66
            ? 'rgb(50, 50, 240)'
            : data >= 66
            ? 'blue'
            : 'gray'
        }`
      );
    }

    for (let i = 0; i < states.length; i++) {
      const tooltip = document.getElementById('tooltip');
      states[i].addEventListener('mouseover', e => {
        const areaName = e.target.getAttribute('data-areaname');
        const state = e.target.getAttribute('data-state');
        const bachelorsOrHigher = e.target.getAttribute(
          'data-bachelorsOrHigher'
        );
        tooltip.innerHTML = `<p>${areaName}, ${state}: ${bachelorsOrHigher}%</p>`;
        tooltip.style.opacity = 1;
        tooltip.style.left = `${
          e.x > 700 ? e.x - 270 + 'px' : e.x + 20 + 'px'
        }`;
        tooltip.style.top = e.y + 'px';
      });
      states[i].addEventListener('mouseleave', e => {
        tooltip.style.opacity = 0;
        tooltip.style.top = 0;
        tooltip.style.left = 0;
      });
    }
  });
