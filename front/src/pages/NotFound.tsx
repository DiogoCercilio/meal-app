import { ArrowLongLeftIcon } from '@heroicons/react/20/solid'
import { Typography } from '@material-tailwind/react'
import { Link } from 'react-router-dom'

function NotFound() {
    return (
        <div className="flex text-center flex-1 m-auto justify-center items-center w-full" style={{ height: '100vh' }}>
            <div>
                <Typography variant="h3" className="text-blue-gray-700">
                    Not Found 404
                </Typography>
                <div className="flex w-40 mt-3 items-center m-auto color-blue-700 underline">
                    <ArrowLongLeftIcon className="h-5 w-5 mr-2 ml-3" />
                    <Link to={'/list'}>Back to home</Link>
                </div>
            </div>
        </div>
    )
}

export default NotFound