import { map, route, mount } from "navi";
import Homepage from "../Homepage";
import Register from "../Register";
import Admin from "../pages/Admin";
import StoreList from "../pages/StoreList";
import StoreDetails from "../pages/StoreDetails";
import StoreOrder from "../pages/StoreOrder";
import Checkout from "../pages/Checkout";
import Orderwait from "../pages/Orderwait";

export const routes = mount({
    '/': route({ view: <Homepage /> }),
    '/Register':route({view: <Register />}),
    '/Storelist':route({view: <StoreList />}),
    '/Store-details': route({ view: <StoreDetails /> }),
    '/Store/:id':route({view: <StoreOrder/>}),
    '/admin':route({view: <Admin />}),
    '/checkout':map(req=>
        route({view: <Checkout orderSummary={req.body} />})
    ),
    '/orders':route({view: <Orderwait />}) 
})
