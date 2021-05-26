// CONFIGURE HERE THE VARIABLES THAT WILL BE CHANGED BEFORE THE PRESALE

//----------------------------------------------------------------------------------------------------------------------------------------------

// LABO ADDRESSES

const laboBusdAddr = '0xB830Cc1bb2CdF44a6eb6898e8119455B87dA11FE'
const laboBnbAddr = '0xAa23C415666Fc47E905886F2545BD40b0bc06fbA'
const laboBusdAddrV2 = '0x9F7d34d03B0b56263705e1253EE83BF434509D6C'
const laboBnbAddrV2 = '0xD08841b790A125888617cBa8395cc04B226d245F'
const laboAddr = '0x171401a3d18B21BFa3f9bF4F9637F3691158365A'
const masterChef = '0x30f4cb706e65ABB3cbC3fFC2805E8Ff50eA8fbC8'

// LABO RELATED PIDS

const pidLaboBusd = 20
const pidLaboBnb = 21
const pidLabo = 9

// OTHER PIDS THAT ARE REFERENCED THROUGHOUT THE CODE

const pidBnbBusd = 0

// SET countBack TO TRUE TO COUNT BACK AS FAR AS countLength

const countBack = false
const countLength = 2

// CHANGE LABO FOR THE TOKEN BEIGN TESTED

const xPerBlock = "laboPerBlock" // referenced in getMasterChefAddress()
const pendingX = "pendingLabo"

// SEARCH AND REPLACE THIS STRING IF USING ANY OTHER THAN LABO: await masterChefContract.methods.pendingLabo in \src\state\pools\fetchPoolsUser.ts

// USE OUR CUSTOM WAY OF FETCHING PRICE

const fetchAutomatic = false;
const fetchPriceCustom = false;

// BitQuery RESPONSE POSITIONS

const busdPosition = 0
const tokenPosition = 1

// IS LOCKED

const unlockWalletButton = false;

// IS FARMS CONFIGURED

const isFullyConfigured = true;
const showFarmInfoModal = true;


//----------------------------------------------------------------------------------------------------------------------------------------------

// EDIT ABOVE NOT HERE

const labo = {
    addr: {
        laboBusdAddr,
        laboBnbAddr,
        laboBusdAddrV2,
        laboBnbAddrV2,
        laboAddr,
        masterChef,
    },
    pids: {
        pidLaboBusd, 
        pidLaboBnb,
        pidLabo,
        pidBnbBusd,
        pidList: [
            pidLaboBusd, // LABO-BUSD LP [0]
            pidLaboBnb, // LABO-BNB LP [1]
            pidBnbBusd, // BNB-BUSD LP [2]
            1, // USDT-BUSD LP [3]
            2, // BTCB-BNB LP [4]
            3, // ETH-BNB LP [5]
            4, // DAI-BUSD LP [6]
            5, // USDC-BUSD LP [7]
            6, // DOT-BNB LP [8]
            7, // CAKE-BUSD LP [9]
            8, // CAKE-BNB LP [10]
            pidLabo, // LABO [11]
            10, // BUSD [12]
            11, // WBNB [13]
            12, // EGG [14]
            18, // BTCB [15]
            14, // ETH [16]
            15, // DAI [17]
            16, // USDC [18]
            17, // DOT [19]
            19, // BSCX [20]
            13, // AUTO [21]
            22, // LABO-GYA [22]
            23, // LABO-DSL [23]
            24, // LABO-BUSD LP V2 [24]
            25, // LABO-BNB LP V2 [25]
            26, // BUSD-BNB LP V2 [26]
            27, // USDT-BUSD LP V2 [27]
            28, // BTCB-BNB LP V2 [28] 
            29, // ETH-BNB LP V2 [29]
            30, // DAI-BUSD LP V2 [30] 
            31, // USDC-BUSD LP V2 [31]
            31, // DOT-BNB LP V2 [32]
            32, // CAKE-BNB LP V2 [33]
            33, // ADA-WBNB LP V2 [34]


        ],
    },
    strings: {
        xPerBlock,
        pendingX
    },
    fetch: {
        fetchAutomatic,
        fetchPriceCustom
    },
    queryPosition: {
        busd: busdPosition,
        token: tokenPosition
    },
    isLocked: {
        unlockWalletButton
    },
    isFullyConfigured,
    showFarmInfoModal
}
 
export default labo;