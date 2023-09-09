import React, { HTMLAttributes, useEffect, useRef } from 'react'
import './style.css'
type Props = HTMLAttributes<HTMLDivElement> & {
  text: string
  show?: boolean
  event?: 'click' | 'hover'
  position?: 'bottom' | 'top'
}
export default function Tooltip({ text, position = 'bottom', children, event = 'hover' }: Props) {
  const toolTipRef = useRef<HTMLSpanElement>(null)
  const toolTipParentRef = useRef<HTMLDivElement>(null)

  let timeOut: any

  useEffect(() => {
    const outsideClik = ({ target }: MouseEvent) => {
      assertIsNode(target)
      if (!toolTipRef.current || !toolTipParentRef.current || toolTipParentRef.current.contains(target)) return
      toolTipRef.current.classList.remove('r-tooltip-show')
      clearTimeout(timeOut)
    }
    if (event == 'click') document.addEventListener('click', outsideClik)
    return () => {
      document.removeEventListener('click', outsideClik)
    }
  }, [event, timeOut])

  return (
    <div
      ref={toolTipParentRef}
      className='r-tooltip-container'
      onClick={() => {
        if (!toolTipRef.current || event != 'click') return
        toolTipRef.current.classList.add('r-tooltip-show')
      }}
      onMouseLeave={() => {
        if (!toolTipRef.current || !toolTipRef.current.classList.contains('r-tooltip-show')) return
        clearTimeout(timeOut)
        timeOut = setTimeout(() => {
          if (!toolTipRef.current) return
          toolTipRef.current.classList.remove('r-tooltip-show')
        }, 3000)
      }}
      onMouseEnter={() => {
        if (!toolTipRef.current || !toolTipParentRef.current) return
        // const { left } = toolTipParentRef.current.getBoundingClientRect();
        // toolTipRef.current.style.left = clientX - left + "px";
      }}
    >
      {children}
      <span ref={toolTipRef} className={`r-tooltip rt-${event} rt-${position}`} dangerouslySetInnerHTML={{ __html: text }} />
    </div>
  )
}

export function assertIsNode(e: EventTarget | null): asserts e is Node {
  if (!e || !('nodeType' in e)) {
    throw new Error(`Node expected`)
  }
}
