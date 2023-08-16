import userACL from "./access";


export const TALLY_URL = 'http://44.204.160.85:5000'


export const getHeader = () => {
    let fetchData = userACL.atFetch(),
        domain = fetchData.domain;
        // domain = "DEMOTEST"
    return { headers: { 'accountName': domain, 'Content-Type': 'application/json' } }
}

export const getHeaderJWT = () => { 
    return{ 
        headers : {'Authorization': `Bearer ${localStorage.getItem('user')}`, 
                    'Content-Type' : 'application/json',
                    'X-RLB-DMS-ACC': localStorage.getItem('acc')
                }
    }
}