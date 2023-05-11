import { useRoutes } from 'react-router-dom'
import { routes } from "./routes";
import { getClient } from "./queryClient";
import { ReactQueryDevtools} from "react-query/devtools";
import { QueryClientProvider } from "react-query";

const App = () => {
    const elem = useRoutes(routes)
    const queryClient = getClient()
    return (
        <QueryClientProvider client={queryClient}>
        {elem}
        <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
    )
}

export default App