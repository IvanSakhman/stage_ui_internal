const growSpacerStyle = { flexShrink: 0, flexGrow: 1, width: 8 }
const spacerStyle = { flexShrink: 0, width: 8 }

// type Props = {
//   grow?: boolean
// }

const Spacer = ({ grow }) => {
  if (grow) {
    return <div style={growSpacerStyle} />
  }
  return <div style={spacerStyle} />
}

export default Spacer
