import React from 'react'

export default function SvgFFilter() {
  return (
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
    <defs>
        
        <filter id="turbulence" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence  baseFrequency="0.02 0.03 " result='NOISE' numOctaves={1} >   
            </feTurbulence> 
            <feDisplacementMap scale={10} in='SourceGraphic' in2={"NOISE"}  ></feDisplacementMap>
            <animate in=''> </animate>
        </filter>
      
        
    </defs>
</svg>

  )
}
