import styled from 'styled-components'
export const Container = styled.div`
  display: inline-block;
  position: relative;
  .r-tooltip {
    --tw-bg-opacity: 0.75;
    background: rgb(51 65 85);
    visibility: hidden;
    padding: 0.25rem /* 4px */;
    border-radius: 0.25rem /* 4px */;
    position: absolute;
    white-space: nowrap;
    font-size: 0.75rem /* 12px */;
    line-height: 1rem /* 16px */;
    color: wheat;
  }
  &:hover .rt-hover {
    visibility: visible;
  }
  .rt-bottom,
  .rt-top {
    left: 50%;
    transform: translateX(-50%);
  }
  .r-tooltip-show {
    visibility: visible !important;
  }
`
