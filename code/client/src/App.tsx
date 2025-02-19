import { UserPage } from "./user-page"
import { Users } from "./users";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export const App: React.FC = () => {
    return (
        <div className="p-4 space-y-8">
            <h1 className="text-xl">SimpleCrm</h1>
            <Router>
                <Routes>
                    <Route path="/users" element={<Users/>} />
                    <Route path="/users/:id" element={<UserPage/>} />
                </Routes>
            </Router>

        </div>
    );
};

export default App;