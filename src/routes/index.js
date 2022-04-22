import { map, route, mount } from "navi";
import Homepage from "../Homepage";
import Register from "../Register";
import Admin from "../pages/Admin";
import StoreList from "../pages/StoreList";
import StoreDetails from "../pages/StoreDetails";
import StoreOrder from "../pages/StoreOrder";
import Checkout from "../pages/Checkout";

async function fetchMenu(id){
    const obj = {
        "store_name": "Nanthans Famous",
        "items": [
            {
                "name": "egg",
                "price": "12",
                "description": "just a egg",
                "figure": [
                    {
                        "uid": "rc-upload-1650150650093-2",
                        "lastModified": 1649784159409,
                        "lastModifiedDate": "2022-04-12T17:22:39.409Z",
                        "name": "Screen Shot 2022-04-12 at 6.22.38 PM.png",
                        "size": 23378,
                        "type": "image/png",
                        "percent": 0,
                        "originFileObj": {
                            "uid": "rc-upload-1650150650093-2"
                        },
                        "error": {
                            "isTrusted": true
                        },
                        "status": "error"
                    }
                ]
            },{ "name": "Big egg",
            "price": "12",
            "description": "just a big egg",

            }
        ]
    }
    return Promise.resolve(obj)
}

export const routes = mount({
    '/': route({ view: <Homepage /> }),
    '/Register':route({view: <Register />}),
    '/Storelist':route({view: <StoreList />}),
    '/Store-details': route({ view: <StoreDetails /> }),
    '/Store/:id':route(async req=>{
        let id = req.params.id
        let menu = await fetchMenu(id)
        return {
            view: <StoreOrder id={id} menu={menu} />
        }

    }),
    '/admin':route({view: <Admin />}),
    '/checkout':map(req=>
        route({view: <Checkout orderSummary={req.body} />})
    ) 
})
