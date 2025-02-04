import { createContext , useEffect, useState , useContext } from "react";
import { fakeFetchAssets, fakeFetchCripto } from '../api';
import { percentDiffernce } from '../utilit'

const CryptoContext = createContext({
    assets: [],
    crypto: [],
    loading: false,
});
function mapAssets(assets , result){
    return assets.map(asset =>{
        const coin = result.find((c) => c.id === asset.id)
        return {
            grow: asset.price < coin.price,
            growPercent: percentDiffernce(asset.price, coin.price),
            totalAmount: asset.amount * coin.price,
            totalProfite: asset.amount * coin.price - asset.amount * asset.price,
            name: coin.name,
            ...asset
        }
    })
}
export function CryptoContextProvider({ children }) {
    const [loading, setLoading] = useState(false)
    const [crypto, setCrypto] = useState([]);
    const [assets, setAssets] = useState([]);

    useEffect(() => {
        async function preload() {
            setLoading(true)
            const { result } = await fakeFetchCripto();
            const assets = await fakeFetchAssets();

            setCrypto(result);
            setAssets(mapAssets(assets , result));
            setLoading(false);
        }
        preload()
    }, [])

    function addAsset(newAsset){
        setAssets(prev =>mapAssets([...prev , newAsset] , crypto))
    }
    return <CryptoContext.Provider value={{loading , crypto , assets , addAsset}}>
        {children}
    </CryptoContext.Provider>

}


export default CryptoContext

export function useCripto(){
    return useContext(CryptoContext )
}