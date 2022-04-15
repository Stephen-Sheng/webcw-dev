import { route, mount, compose, withView } from "navi";
import { View } from "react-navi";
import Homepage from "../Homepage";
import Navmenu from "../Navmenu";
import Admin from "../pages/Admin";
import Page1 from "../pages/Page1";
import Page2 from "../pages/Page2";


export const routes = mount({
    '/': route({ view: <Homepage /> }),
    '/page1':route({view: <Page1 />}),
    '/page2': route({ view: <Page2 /> }),
    '/admin':route({view: <Admin />})
})
// export default compose(
//   withView(
//     <Navmenu>
//       <View />
//     </Navmenu>
//   ),

//   mount({
//     '/': route({ view: <Homepage /> }),
//     '/page1': route({ view: <Page1 /> }),
//     '/page2': route({ view: <Page2 /> }),
//     '/admin': route({ view: <Admin /> })
//   })
// )
