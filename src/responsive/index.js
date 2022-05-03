import { useMediaQuery } from 'react-responsive'

const BigScreen = ({ children }) => {
    const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' })
    return isBigScreen ? children : null
}
const Mobile = ({ children }) => {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    return isTabletOrMobile ? children : null
}
const Retina = ({ children }) => {
    const isRetina = useMediaQuery({ minWidth: 1225, maxWidth: 1823 })  
    return isRetina ? children : null
}
const Default = ({ children }) => {
  const isNotMobile = useMediaQuery({ minWidth: 768 })
  return isNotMobile ? children : null
}

export {BigScreen, Mobile, Retina, Default}

