
import SignIn from "../pages/signin";
import List from "../pages/ListMeal";
import Form from "../pages/RegisterMealForm";
import PublicMealList from "../pages/PublicMealList";
import NotFound from "../pages/NotFound";

export const routes = [
    {
        path: "",
        element: <SignIn />
    },
    {
        path: "/list",
        element: <List />
    },
    {
        path: "/meals",
        children: [
            {
                path: "/meals",
                element: <PublicMealList />,
            },
            {
                path: "/meals/form",
                element: <Form />
            },
        ]
    },
    {
        path: "*",
        element: <NotFound />
    }
]