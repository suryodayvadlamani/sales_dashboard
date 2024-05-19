import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { kpi_data, bar_data, line_data, pie_data } from "../data";
import { products } from "../data/products";
import { store } from "../data/store"
const api = axios.create({ baseURL: "http://localhost:3000" });

const adapter = new MockAdapter(api, { delayResponse: 300 })

adapter.onGet("http://localhost:3000/api/kpi_data").reply(200, kpi_data)
adapter.onGet("http://localhost:3000/api/line_data").reply(200, line_data);
adapter.onGet("http://localhost:3000/api/bar_data").reply(200, bar_data);
adapter.onGet("http://localhost:3000/api/pie_data").reply(200, pie_data);
const productsURI = "/api/products";
const productsURL = new RegExp(`${productsURI}/*`);

adapter.onGet(productsURL).reply(function (config) {
    // `config` is the axios config and contains things like the url

    const urlParams = new URLSearchParams(config.url.replace('http://localhost:3000/api/products?', ''));

    const product = urlParams.get('product');
    const date = urlParams.get('date');
    const start = Date.parse(date.from);
    const end = Date.now(date.to);
    if (product) {
        return [
            200,
            store.filter(item => {
                const od = Date.parse(item["Order Date"])
                return od >= start && od <= end
            })
        ];
    } else {
        return [
            200,
            products,
        ];
    }


}
);

export default api