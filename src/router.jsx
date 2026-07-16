import { createBrowserRouter, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Layout from "./components/layout/layout";
import Posts from "./pages/Posts";
import Photos from "./pages/Photos";
import Profile from "./pages/Profile";
import Detail from "./pages/Detail";

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
				path: "/Posts",
				element: <Posts />
			},
			{
				path: "/Photos",
				element: <Photos />
			},
			{
				path: "/Profile",
				element: <Profile />
			},
			{
				path: "/detail/:id",
				element: <Detail />
			},
			{
				path: "*",
				element: <NotFound />
			},
		]
	}
])

export default myRouter