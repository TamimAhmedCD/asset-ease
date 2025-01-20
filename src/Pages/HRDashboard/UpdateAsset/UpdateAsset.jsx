import { useLoaderData } from "react-router-dom";

const UpdateAsset = () => {
    const assets = useLoaderData()
    console.log(assets);
    return (
        <div>
            This is asset update page
        </div>
    );
};

export default UpdateAsset;