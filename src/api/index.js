import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { kpi_data, bar_data, line_data, pie_data } from "../data";

const api = axios.create({ baseURL: "http://localhost:3000" });

const adapter = new MockAdapter(api, { delayResponse: 300 })

adapter.onGet("http://localhost:3000/api/kpi_data").reply(200, kpi_data)
adapter.onGet("http://localhost:3000/api/line_data").reply(200, line_data);
adapter.onGet("http://localhost:3000/api/bar_data").reply(200, bar_data);
adapter.onGet("http://localhost:3000/api/pie_data").reply(200, pie_data);

export default api