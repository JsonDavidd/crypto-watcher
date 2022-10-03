const Charts = ({ coords, width, height }: { coords: number[], width: number, height: number }) => {
  return (
    <svg {...{ width, height }}>
      {((prev = [0, 0]) => coords.map((y, x) => {
        const [prevX, prevY] = prev
        prev = [x, y]
        return (
          <line
            x1={prevX ? prevX : x} y1={prevY ? height - prevY : y}
            x2={x} y2={height - y}
            stroke="black" key={x}></line>
        )
      }))()}
    </svg>
  )
}

export default Charts