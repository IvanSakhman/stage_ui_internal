import SplitPane from 'react-split-pane'
import styled from 'styled-components'

import { COLORS } from '~su/constants'

export const StyledSplitPane = styled(SplitPane)`
  &.horizontal {
    > .Pane1 {
      margin-bottom: 16px;
    }
    > .Pane2 {
      margin-top: 16px;
    }
  }

  &.vertical {
    > .Pane1 {
      margin-right: 16px;
    }
    > .Pane2 {
      margin-left: 16px;
    }
  }

  .Resizer {
    background: ${COLORS.black};
    opacity: 0.2;
    z-index: 5;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -moz-background-clip: padding;
    -webkit-background-clip: padding;
    background-clip: padding-box;
  }

  .Resizer:hover {
    -webkit-transition: all 0.3s ease;
    transition: all 0.3s ease;
  }

  .Resizer.horizontal {
    height: 11px;
    margin: -5px 0;
    border-top: 5px solid rgba(255, 255, 255, 0);
    border-bottom: 5px solid rgba(255, 255, 255, 0);
    cursor: row-resize;
    width: 100%;
  }

  .Resizer.horizontal:hover {
    border-top: 5px solid ${COLORS.primary_color_90};
    border-bottom: 5px solid ${COLORS.primary_color_90};
  }

  .Resizer.vertical {
    width: 11px;
    margin: 0 -5px;
    border-left: 5px solid rgba(255, 255, 255, 0);
    border-right: 5px solid rgba(255, 255, 255, 0);
    cursor: col-resize;
  }

  .Resizer.vertical:hover {
    border-left: 5px solid ${COLORS.primary_color_90};
    border-right: 5px solid ${COLORS.primary_color_90};
  }

  .Resizer.disabled {
    cursor: not-allowed;
  }
  .Resizer.disabled:hover {
    border-color: transparent;
  }
`
