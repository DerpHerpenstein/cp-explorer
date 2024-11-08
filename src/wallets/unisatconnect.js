class UniSatConnect {
 
    constructor() {
      this.connected = null;
      this.connectType = null;
      this.walletAddress = null;
      this.publicKey = null; 
    }

    async broadcastPSBT(rawTxHex){
        try {
            let res = await window.unisat.pushPsbt(rawTxHex);
            return res;

        } 
        catch (error) {
            console.log("Broadcast failed", error);
            // re-throw the error so it can be handled by the caller
            throw error;
        }
    }


    signPSBT = async(rawPSBT) => {
        let signedPsbt = await window.unisat.signPsbt(rawPSBT); 
        return signedPsbt;
    }


    signAndBroadcastPSBT = async (psbt) => { 
            try {
                let signedPSBT = await this.signPSBT(psbt);
                let result = await this.broadcastPSBT(signedPSBT);
                return(result)


            } catch (error) {
                throw new Error(`Error signing PSBT: ${error.message}`);
            }

    }

    static isUnisatInstalled = () => {
        if (typeof window !== 'undefined') {
            return typeof window.unisat !== 'undefined';
        } else {
            return false;
        }
    }

    async connect() {
        this.connected = false;
        // check if UniSat is installed
        if (UniSatConnect.isUnisatInstalled()) {
            try {
                let accounts = await window.unisat.requestAccounts();
                if (accounts[0].indexOf("bc1q") == 0) {
                    this.walletAddress = accounts[0];
                    this.publicKey = await window.unisat.getPublicKey();
                    this.connected = true;
                } else
                    throw new Error('Use a native segwit address (bc1q...)');
              } catch (error) {
                throw error;
              }
        } else {
            throw new Error('UniSat Wallet is not installed');
        }
    }
    
}

export default UniSatConnect;