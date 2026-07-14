import { createBrowserRouter, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Layout from "./components/layout/layout";

const myRouter = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				index: true,
				element: <Home />
			},
			{
				path: "/About",
				element: <About />
			},
			{
				path: "*",
				element: <NotFound />
			},
		]
	}
])

export default myRouter