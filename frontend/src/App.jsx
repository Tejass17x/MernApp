import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import AuthLayout from "./components/layout/AuthLayout";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";

function App() {
	const { authUser } = useAuthContext();

	return (
		<div className='min-h-dvh flex flex-col'>
			<Routes>
				<Route path='/' element={authUser ? <Home /> : <Navigate to='/login' />} />
				<Route
					path='/login'
					element={
						authUser ? (
							<Navigate to='/' />
						) : (
							<AuthLayout>
								<Login />
							</AuthLayout>
						)
					}
				/>
				<Route
					path='/signup'
					element={
						authUser ? (
							<Navigate to='/' />
						) : (
							<AuthLayout title='Join ChatApp'>
								<SignUp />
							</AuthLayout>
						)
					}
				/>
			</Routes>
			<Toaster
				position='top-center'
				toastOptions={{
					className: "text-sm",
					style: {
						background: "#1e293b",
						color: "#f1f5f9",
						border: "1px solid rgba(255,255,255,0.1)",
					},
				}}
			/>
		</div>
	);
}

export default App;
