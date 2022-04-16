import { route, mount } from "navi";
import Homepage from "../Homepage";
import Admin from "../pages/Admin";
import StoreList from "../pages/StoreList";
import StoreDetails from "../pages/StoreDetails";


export const routes = mount({
    '/': route({ view: <Homepage /> }),
    '/Storelist':route({view: <StoreList />}),
    '/Store-details': route({ view: <StoreDetails /> }),
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
