
const LoadingSpinner = () => {
    return (
        <div className="flex justify-center items-center h-full w-full py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
        </div>
    );
};

export default LoadingSpinner;
