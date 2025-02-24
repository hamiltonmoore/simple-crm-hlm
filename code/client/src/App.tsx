import { UserPage } from "./user-page"
import { Users } from "./users";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

export const App: React.FC = () => {
    return (
        <Router>
            <div className="p-4 space-y-8 min-h-screen">
                <h1 className="text-xl font-bold">
                    <Link to="/users" className="text-blue-500 hover:text-blue-700">
                        Simple CRM
                    </Link>
                </h1>
                <Routes>
                    <Route path="/users" element={<Users />} />
                    <Route path="/users/:id" element={<UserPage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;