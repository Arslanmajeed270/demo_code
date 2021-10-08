import React, { SVGProps } from 'react'

export const DiamondFilledIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    version="1.1"
    viewBox="0 0 223.646 223.646"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <polygon fill={props.color} points="111.823,0 16.622,111.823 111.823,223.646 207.025,111.823" />
  </svg>
)